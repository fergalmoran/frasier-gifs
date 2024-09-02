'use client';

import React from 'react';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react';
import { logger } from '@lib/logger';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  FaFacebook,
  FaGithub,
  FaGithubAlt,
  FaGoogle,
  FaTwitter,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
    setTheProviders();
  }, []);
  const handleProviderAuth = async (provider: string) => {
    logger.debug('signin', 'handleProviderAuth', provider);
    const res = await signIn(provider, {
      callbackUrl: `${process.env.API_URL}`,
    });
    logger.debug('signin', 'handleProviderAuth_res', res);
    if (res?.ok) {
      router.push('/');
    }
  };
  return (
    <>
      <div className="divider">or continue with</div>
      <div className="flex flex-grow w-full gap-3 mt-6">
        {providers?.facebook && (
          <button
            onClick={() => handleProviderAuth(providers.facebook.id)}
            className="justify-center flex-1 w-full px-2 py-1 btn btn-outline "
          >
            <span className="sr-only">Sign in with Facebook</span>
            <FaFacebook className="w-5 h-5" />
          </button>
        )}
        {providers?.google && (
          <button
            onClick={() => handleProviderAuth(providers.google.id)}
            className="justify-center flex-1 w-full px-2 py-1 btn btn-outline "
          >
            <span className="sr-only">Sign in with Google</span>
            <FaGoogle className="w-5 h-5" />
          </button>
        )}
        {providers?.github && (
          <button
            onClick={() => handleProviderAuth(providers.github.id)}
            className="justify-center flex-1 w-full px-2 py-1 btn btn-outline "
          >
            <span className="sr-only">Sign in with GitHub</span>
            <FaGithub className="w-5 h-5" />
          </button>
        )}
        {providers?.twitter && (
          <button
            onClick={() => handleProviderAuth(providers.twitter.id)}
            className="justify-center flex-1 w-full px-2 py-1 btn btn-outline "
          >
            <span className="sr-only">Sign in with Twitter</span>
            <FaTwitter className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default SocialLogin;
