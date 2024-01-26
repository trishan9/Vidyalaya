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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const AccessForm = ({
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
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter access settings updated sucessfully");
      setIsEditing((current) => !current);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Chapter access
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <Fragment>Cancel</Fragment>
          ) : (
            <Fragment>
              <Pencil className="w-4 h-4 mr-2" />
              Edit access
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
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for
                      preview
                    </FormDescription>
                  </div>
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
        <p
          className={cn(
            "text-sm  mt-2",
            !initialData.isFree && "text-slate-500 italic",
          )}
        >
          {initialData.isFree ? (
            <>This chapter is free for preview.</>
          ) : (
            <>This chapter is not free.</>
          )}
        </p>
      )}
    </div>
  );
};

export default AccessForm;
