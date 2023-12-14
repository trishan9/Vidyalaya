import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();
  const courses = await db.course.findMany({
    where: {
      //@ts-expect-error
      userId,
    },
  });

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <Link href="/instructor/courses/create">
        <Button>Add New Course</Button>
      </Link>

      <div className="flex flex-col gap-4 my-4">
        {courses &&
          courses.map((course) => (
            <Link
              key={course.id}
              href={`/instructor/courses/${course.id}`}
              className="underline cursor-pointer"
            >
              {course.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CoursesPage;
