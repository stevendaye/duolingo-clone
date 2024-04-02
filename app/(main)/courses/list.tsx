"use client";

import { useRouter } from "next/navigation";
import { courses, userProgress } from "@/db/schema";
import { toast } from "sonner";
import { Card } from "./card";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  courses: (typeof courses.$inferInsert)[];
  activeCourseId?: typeof userProgress.$inferInsert.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pedning, startTransition] = useTransition();

  const handleOnClick = (id: number) => {
    if (pedning) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      // Call server action
      upsertUserProgress(id).catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id!}
          title={course.title}
          imageSrc={course.imageSrc}
          disabled={pedning}
          active={course.id === activeCourseId}
          onClick={handleOnClick}
        />
      ))}
    </div>
  );
};
