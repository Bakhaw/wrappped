"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const emailFromURL = params.get("email");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: emailFromURL ?? "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      form.setError("email", { message: "Email or password is wrong" });
      form.setError("password", { message: "Email or password is wrong" });
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={Boolean(emailFromURL)}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6 font-bold" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
      <p className="text-center text-sm text-primary mt-2">
        Still don&apos;t have an account ?&nbsp;
        <Link className="text-primary font-bold" href="/sign-up">
          Sign Up
        </Link>
      </p>
    </Form>
  );
}

export default SignInForm;
