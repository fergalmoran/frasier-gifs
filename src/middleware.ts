import { NextRequest, NextResponse, URLPattern } from "next/server";
import { promises as fs } from "fs";
import mime from "mime-types";
import { env } from "./env";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/upload(.*)", "/i/:id(.*)"],
};
const PATTERNS: [
  URLPattern,
  ({ pathname }: { pathname: { groups: any } }) => any,
][] = [
  [
    new URLPattern({ pathname: "/i/:id" }),
    ({ pathname }: { pathname: { groups: any } }) => pathname.groups,
  ],
];

const params = (url: string) => {
  const input = url.split("?")[0];
  let result = {};

  for (const [pattern, handler] of PATTERNS) {
    if (!pattern) return;
    const patternResult = pattern.exec(input);
    if (patternResult !== null && "pathname" in patternResult) {
      result = handler(patternResult);
      break;
    }
  }
  return result || {};
};
export async function middleware(request: NextRequest, response: NextResponse) {
  const { id } = params(request.url) as { id?: string };
  return NextResponse.rewrite(new URL(`/uploads/${id}`, request.url));
}
