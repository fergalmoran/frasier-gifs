'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { UserNavDropdown } from '@components';

interface ILoginButtonProps {
  session: any;
}

const LoginButton: React.FC<ILoginButtonProps> = ({ session }) => {
  return session ? (
    <UserNavDropdown session={session} />
  ) : (
    <button
      onClick={() => signIn()}
      className="normal-case btn btn-ghost drawer-button"
    >
      <RiLoginCircleLine className="inline-block w-6 h-6 fill-current md:mr-1" />
      Login
    </button>
  );
};

export default LoginButton;
