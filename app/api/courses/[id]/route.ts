import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const payload = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      data: {
        ...payload,
      },
      where: {
        id,
        userId,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Can't update course", { status: 404 });
  }
}
