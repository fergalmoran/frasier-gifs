"use client";
import SocialLogin from "@/components/widgets/login/SocialLogin";
import Link from "next/link";
import React from "react";
import { logger } from "@/lib/logger";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: "fergal.moran+opengifame@gmail.com",
    password: "secret",
  });

  return (
    <div className="flex min-h-full flex-col justify-center py-1 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm">
          Or
          <Link href="/register" className="font-medium">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              logger.debug("signin", "using", userInfo);
              const result = await signIn("credentials", {
                redirect: false,
                email: userInfo.email,
                password: userInfo.password,
              });
              logger.debug("signin", "result", result);
            }}
            method="post"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userInfo.email}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, email: target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userInfo.password}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="remember-me"
                  className="text-accent ml-2 block text-sm"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-info hover:text-primary/50 font-medium"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
