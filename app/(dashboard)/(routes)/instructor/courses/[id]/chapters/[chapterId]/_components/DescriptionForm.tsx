"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import type { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

const DescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: {
  initialData: Chapter;
  courseId: Course["id"];
  chapterId: Chapter["id"];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      description: initialData.description ? initialData.description : "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter description updated sucessfully");
      setIsEditing((current) => !current);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Chapter description
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <Fragment>Cancel</Fragment>
          ) : (
            <Fragment>
              <Pencil className="w-4 h-4 mr-2" />
              Edit description
            </Fragment>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting || !isValid}>
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "text-sm  mt-2",
            !initialData.description && "text-slate-500 italic",
          )}
        >
          {(initialData.description && (
            <Preview value={initialData.description} />
          )) ||
            "No description"}
        </div>
      )}
    </div>
  );
};

export default DescriptionForm;
