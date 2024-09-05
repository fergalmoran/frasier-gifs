// src/components/RegistrationForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { logger } from "@/lib/logger";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registrationSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string().min(5),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const createUser = api.auth.create.useMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsLoading(true);
    try {
      await createUser.mutateAsync(data);
      toast("User registered successfully");
      router.push("/signin");
    } catch (error) {
      logger.error("RegistrationForm", "error", error);
      toast("Failed to register user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              defaultValue={"fergal.moran+opengifame@gmail.com"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              defaultValue={"secret"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              defaultValue={"secret"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {form.formState.errors.confirmPassword && (
                    <FormMessage>
                      {form.formState.errors.confirmPassword.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            {form.formState.errors && false && (
              <Alert>
                <Icons.terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  {JSON.stringify(form.formState.errors)}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <Button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
