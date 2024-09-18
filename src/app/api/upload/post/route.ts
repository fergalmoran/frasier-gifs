import { getServerSession } from "next-auth";
import { StatusCodes } from "http-status-codes";
import { env } from "@/env";
import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      error: "Unauthorized",
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      error: "No post id in query",
      status: StatusCodes.BAD_REQUEST,
    });
  }
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const file = (body.image as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname((body.image as File).name);
    const filePath = `${id}${extension}`;

    fs.writeFileSync(path.resolve(env.UPLOAD_PATH, filePath), buffer);

    await db.update(images).set({ filePath }).where(eq(images.id, id));

    return NextResponse.json({
      success: true,
      url: env.NEXT_PUBLIC_SITE_URL + `/i/${filePath}`,
    });
  }
  return NextResponse.json({
    error: "Cannot find file in form data",
    status: StatusCodes.BAD_REQUEST,
  });
}
