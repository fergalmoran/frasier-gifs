/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "opengifame.dev.fergl.ie",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/i/:path*",
  //       destination: "https://your-custom-image-location.com/:path*", // Replace with your custom location
  //     },
  //   ];
  // },
};

export default config;
