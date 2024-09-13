import { getServerSession } from "next-auth";
import { StatusCodes } from "http-status-codes";
import { env } from "@/env";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      error: "Unauthorized",
      status: StatusCodes.UNAUTHORIZED,
    });
  }
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const uploadDir = env.UPLOAD_PATH;
  return Response.json(
    {
      id,
      session,
      uploadDir,
    }
  );
}
