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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <RegistrationForm />
        <SocialLogin />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

// const SignUpPage = () => {
//   const router = useRouter();
//
//   const signup = api.auth.create.useMutation({
//     onSuccess: () => router.push("/auth/signin"),
//     onError: (error) => {
//       logger.error("signup", "error", error);
//     },
//   });
//   const [userInfo, setUserInfo] = React.useState({
//     email: "fergal.moran+opengifame@gmail.com",
//     password: "secret",
//     repeatPassword: "secret",
//   });
//
//   return (
//     <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-2 text-center text-3xl font-extrabold">
//           Create new account
//         </h2>
//       </div>
//
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10">
//           <form
//             className="space-y-6"
//             onSubmit={(e) => {
//               e.preventDefault();
//               signup.mutate(userInfo);
//             }}
//             method="post"
//           >
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={userInfo.email}
//                   onChange={({ target }) =>
//                     setUserInfo({ ...userInfo, email: target.value })
//                   }
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             </div>
//
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={userInfo.password}
//                   onChange={({ target }) =>
//                     setUserInfo({ ...userInfo, password: target.value })
//                   }
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="repeat-password"
//                 className="block text-sm font-medium"
//               >
//                 Repeat password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="repeat-password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={userInfo.repeatPassword}
//                   onChange={({ target }) =>
//                     setUserInfo({ ...userInfo, repeatPassword: target.value })
//                   }
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             </div>
//
//             <div>
//               <button type="submit" className="btn btn-primary w-full">
//                 Create account
//               </button>
//             </div>
//           </form>
//
//           <div className="mt-6">
//             <SocialLogin />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default SignUpPage;
