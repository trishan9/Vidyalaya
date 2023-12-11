import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const CourseIdPage = async ({ params: { id } }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div>
      <h1>I am {course?.title}</h1>
    </div>
  );
};

export default CourseIdPage;
