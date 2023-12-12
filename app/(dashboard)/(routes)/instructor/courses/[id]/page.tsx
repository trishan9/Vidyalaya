import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";

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

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>

          <span className="text-sm text-slate-700">
            Complete all fields ({completionText})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 rounded-full bg-[#BFD7EA] text-[#087E8B]">
              <LayoutDashboard size={25} />
            </div>

            <h2 className="text-xl">Customize your course</h2>
          </div>

          <TitleForm initialData={course} courseId={course.id} />

          <DescriptionForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
