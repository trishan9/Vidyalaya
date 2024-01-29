import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { db } from "@/lib/db";
import IconBadge from "@/components/IconBadge";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import AccessForm from "./_components/AccessForm";
import VideoForm from "./_components/VideoForm";
import Banner from "@/components/Banner";
import ChapterActions from "./_components/ChapterActions";

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
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course."
        />
      )}

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

              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
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

              <DescriptionForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />

                <h2 className="text-xl">Access Settings</h2>
              </div>

              <AccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />

              <h2 className="text-xl">Add a video</h2>
            </div>

            <VideoForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
