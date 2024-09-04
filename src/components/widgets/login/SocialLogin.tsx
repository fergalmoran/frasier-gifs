"use client";

import React from "react";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { logger } from "@/lib/logger";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import type { BuiltInProviderType } from "next-auth/providers/index";

const SocialLogin = () => {
  const router = useRouter();
  const [providers, setproviders] = React.useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders().catch((error) => {
      logger.error("SocialLogin", "Error setting up providers", error);
    });
  }, []);
  const handleProviderAuth = async (provider: string) => {
    logger.debug("signin", "handleProviderAuth", provider);
    const res = await signIn(provider, {
      callbackUrl: `${process.env.API_URL}`,
    });
    logger.debug("signin", "handleProviderAuth_res", res);
    if (res?.ok) {
      router.push("/");
    }
  };
  return (
    <>
      <div className="divider">or continue with</div>
      <div className="mt-6 flex w-full flex-grow gap-3">
        {providers?.facebook && (
          <button
            onClick={() => handleProviderAuth(providers.facebook.id)}
            className="btn btn-outline w-full flex-1 justify-center px-2 py-1"
          >
            <span className="sr-only">Sign in with Facebook</span>
            <FaFacebook className="h-5 w-5" />
          </button>
        )}
        {providers?.google && (
          <button
            onClick={() => handleProviderAuth(providers.google.id)}
            className="btn btn-outline w-full flex-1 justify-center px-2 py-1"
          >
            <span className="sr-only">Sign in with Google</span>
            <FaGoogle className="h-5 w-5" />
          </button>
        )}
        {providers?.github && (
          <button
            onClick={() => handleProviderAuth(providers.github.id)}
            className="btn btn-outline w-full flex-1 justify-center px-2 py-1"
          >
            <span className="sr-only">Sign in with GitHub</span>
            <FaGithub className="h-5 w-5" />
          </button>
        )}
        {providers?.twitter && (
          <button
            onClick={() => handleProviderAuth(providers.twitter.id)}
            className="btn btn-outline w-full flex-1 justify-center px-2 py-1"
          >
            <span className="sr-only">Sign in with Twitter</span>
            <FaTwitter className="h-5 w-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default SocialLogin;
