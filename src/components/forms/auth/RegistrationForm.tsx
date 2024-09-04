// src/components/RegistrationForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "shadcn-ui";

const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const createUser = trpc.auth.create.useMutation();

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      await createUser.mutateAsync(data);
      alert("User registered successfully");
    } catch (error) {
      alert("Failed to register user");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...register("email")} />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>
      </FormField>
      <FormField>
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...register("password")} />
          </FormControl>
          {errors.password && (
            <FormMessage>{errors.password.message}</FormMessage>
          )}
        </FormItem>
      </FormField>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegistrationForm;
