"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { RiLoginCircleLine } from "react-icons/ri";
import UserNavDropdown from "../UserNavDropdown";

interface ILoginButtonProps {
  session: any;
}

const LoginButton: React.FC<ILoginButtonProps> = ({ session }) => {
  return session ? (
    <UserNavDropdown session={session} />
  ) : (
    <button
      onClick={() => signIn()}
      className="btn btn-ghost drawer-button normal-case"
    >
      <RiLoginCircleLine className="inline-block h-6 w-6 fill-current md:mr-1" />
      Login
    </button>
  );
};

export default LoginButton;
