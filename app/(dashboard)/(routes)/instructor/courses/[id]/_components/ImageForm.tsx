"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Course } from "@prisma/client";
import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Course Image must be added.",
  }),
});

const ImageForm = ({
  initialData,
  courseId,
}: {
  initialData: Course;
  courseId: Course["id"];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course image updated sucessfully");
      setIsEditing((current) => !current);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Course image
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <Fragment>Cancel</Fragment>
          ) : (
            <>
              {initialData.imageUrl ? (
                <Fragment>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit image
                </Fragment>
              ) : (
                <Fragment>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add an image
                </Fragment>
              )}
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
        </div>
      ) : (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.imageUrl && "text-slate-500 italic",
          )}
        >
          {initialData.imageUrl ? (
            <div className="relative mt-2 aspect-video">
              <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-md h-60 bg-slate-200">
              <ImageIcon className="w-10 h-10 text-slate-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageForm;
