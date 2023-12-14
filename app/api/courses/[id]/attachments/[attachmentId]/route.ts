import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params: { id, attachmentId },
  }: { params: { id: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId: id,
      },
    });
    return NextResponse.json(attachment);
  } catch {
    return new NextResponse("Can't add attachments", { status: 500 });
  }
}
