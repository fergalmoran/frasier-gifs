"use client";

import React from "react";
import RegistrationForm from "@/components/forms/auth/RegistrationForm";
import SocialLogin from "@/components/widgets/login/SocialLogin";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const RegisterPage: React.FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground">Register for an account</p>
      </div>
      <RegistrationForm />
      <SocialLogin />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/signin"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Login?
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
