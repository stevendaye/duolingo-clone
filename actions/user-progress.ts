"use server";

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { redirect } from "next/navigation";

/* Server actions behave as if calling an API */
export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized");

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course Not Found");
  }

  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error("Course is Empty");
  // }

  const existingUserProgress = await getUserProgress();

  // When user progress exists, we just update
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  // Otherwise, we do a new insertion by creating a new prgress
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
