"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import type { Chapter, Course, MuxData } from "@prisma/client";
import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const VideoForm = ({
  initialData,
  courseId,
  chapterId,
}: {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: Course["id"];
  chapterId: Chapter["id"];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter video updated sucessfully");
      setIsEditing((current) => !current);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <Fragment>Cancel</Fragment>
          ) : (
            <>
              {initialData.videoUrl ? (
                <Fragment>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit video
                </Fragment>
              ) : (
                <Fragment>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add a video
                </Fragment>
              )}
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div className="">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
        </div>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.videoUrl && "text-slate-500 italic",
          )}
        >
          {initialData.videoUrl ? (
            <div className="relative mt-2 aspect-video">
              <MuxPlayer playbackId={initialData?.muxData?.playbackId ?? ""} />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-md h-60 bg-slate-200">
              <Video className="w-10 h-10 text-slate-500" />
            </div>
          )}
        </p>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default VideoForm;
