import { POST } from "./route";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import path from "path";
import { env } from "@/env";
const mockGetServerSession = require("next-auth").getServerSession;

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("fs");
jest.mock("path");

describe("POST /api/upload/post", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return UNAUTHORIZED if session is not found", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const request = new NextRequest(
      new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/upload/post`),
    );
    const response = await POST(request);

    expect(response).toEqual(
      NextResponse.json({
        error: "Unauthorized",
        status: StatusCodes.UNAUTHORIZED,
      }),
    );
  });

  it("should return BAD_REQUEST if id is not provided", async () => {
    mockGetServerSession.mockResolvedValue({ user: { name: "test" } });

    const request = new NextRequest(
      new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/upload/post`),
    );
    const response = await POST(request);

    expect(response).toEqual(
      NextResponse.json({
        error: "No post id in query",
        status: StatusCodes.BAD_REQUEST,
      }),
    );
  });

  it("should return BAD_REQUEST if file is not found in form data", async () => {
    mockGetServerSession.mockResolvedValue({ user: { name: "test" } });

    const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/upload/post?id=123`);
    const request = new NextRequest(url);
    request.formData = jest.fn().mockResolvedValue(new FormData());

    const response = await POST(request);

    expect(response).toEqual(
      NextResponse.json({
        error: "Cannot find file in form data",
        status: StatusCodes.BAD_REQUEST,
      }),
    );
  });

  it("should save the file and return success response", async () => {
    mockGetServerSession.mockResolvedValue({ user: { name: "test" } });

    const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/upload/post?id=123`);
    const request = new NextRequest(url);

    const file = new Blob(["file content"], { type: "image/png" });
    const formData = new FormData();
    formData.append("image", file, "test.png");

    request.formData = jest.fn().mockResolvedValue(formData);

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = "123.png";

    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    jest.spyOn(path, 'resolve').mockReturnValue(`/mocked/path/${filePath}`);

    const response = await POST(request);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      `/mocked/path/${filePath}`,
      buffer,
    );
    expect(response).toEqual(
      NextResponse.json({
        success: true,
        url: env.NEXT_PUBLIC_SITE_URL + `/i/${filePath}`,
      }),
    );
  });
});
