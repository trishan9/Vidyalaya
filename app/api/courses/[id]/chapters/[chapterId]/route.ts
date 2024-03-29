import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { db } from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function PATCH(
  req: Request,
  {
    params: { id: courseId, chapterId },
  }: { params: { id: string; chapterId: string } },
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
      return new NextResponse("Chapter not found!", { status: 401 });
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

    if (payload.videoUrl) {
      const muxDataExists = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (muxDataExists) {
        await Video.Assets.del(muxDataExists.assetId);
        await db.muxData.delete({
          where: {
            id: muxDataExists.id,
          },
        });
      }

      const asset = await Video.Assets.create({
        input: payload.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { id: courseId, chapterId },
  }: { params: { id: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

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
    });

    if (!chapterExists) {
      return new NextResponse("Chapter not found!", { status: 401 });
    }

    if (chapterExists.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
