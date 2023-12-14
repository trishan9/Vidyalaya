import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = auth();

  const { url } = await req.json();

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

  try {
    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: id,
      },
    });
    return NextResponse.json(attachment);
  } catch {
    return new NextResponse("Can't add attachments", { status: 500 });
  }
}
