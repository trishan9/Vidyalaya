import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params: { id: courseId, chapterId },
  }: { params: { id: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...payload } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id: courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapterExists = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
      include: {
        muxData: true,
      },
    });

    if (!chapterExists) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      data: {
        ...payload,
      },
      where: {
        id: chapterId,
        courseId,
      },
    });

    // TODO: Handle Video Upload

    return NextResponse.json(chapter);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
