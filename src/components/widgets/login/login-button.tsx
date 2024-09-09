"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { RiLoginCircleLine } from "react-icons/ri";
import UserNavDropdown from "../user-nav-dropdown";
import { type Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ILoginButtonProps {
  session: Session | null;
}

const LoginButton: React.FC<ILoginButtonProps> = ({ session }) => {
  return session ? (
    <UserNavDropdown session={session} />
  ) : (
    <Button onClick={() => signIn()} className="">
      <Icons.login className="mr-2 h-4 w-4" />
      Login
    </Button>
  );
};

export default LoginButton;
