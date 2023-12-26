import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { db } from "@/lib/db";
import IconBadge from "@/components/IconBadge";
import TitleForm from "./_components/TitleForm";

const ChapterIdPage = async ({
  params: { id: courseId, chapterId },
}: {
  params: { chapterId: string; id: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/instructor/courses/${courseId}`}
            className="flex items-center mb-6 text-sm transition hover:opacity-75"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to course setup
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>

              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={LayoutDashboard} />

              <h2 className="text-xl">Customize your chapter</h2>
            </div>

            <TitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
