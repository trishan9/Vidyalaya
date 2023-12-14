"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Attachment, Course } from "@prisma/client";
import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  Divide,
  File,
  ImageIcon,
  Loader2,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({
  initialData,
  courseId,
}: {
  initialData: Course & { attachments: Attachment[] };
  courseId: Course["id"];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment updated sucessfully");
      setIsEditing((current) => !current);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function onDelete(id: string) {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Course attachment deleted sucessfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Course attachments
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <Fragment>Cancel</Fragment>
          ) : (
            <Fragment>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a file
            </Fragment>
          )}
        </Button>
      </div>

      {isEditing ? (
        <div className="">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
        </div>
      ) : (
        <Fragment>
          {initialData.attachments.length === 0 ? (
            <p className="mt-2 text-sm italic text-slate-500">
              No attachments yet
            </p>
          ) : (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center w-full p-3 border rounded-md bg-sky-100 border-sky-200 text-[#087E8B]"
                >
                  <File className="flex-shrink-0 w-4 h-4 mr-2" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>

                  {deletingId === attachment.id ? (
                    <div className="ml-auto">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AttachmentForm;
