"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";

function GoogleIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.64v3.02h3.89c2.27-2.09 3.53-5.17 3.53-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.89-3.02c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.27a7.2 7.2 0 0 1 0-4.54V6.64H1.28a12 12 0 0 0 0 10.72l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.79l3.45-3.45A11.94 11.94 0 0 0 12 0 11.99 11.99 0 0 0 1.28 6.64l4.01 3.09C6.23 6.89 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}

const inputGroupClassName =
  "h-9 rounded-[3px] border-zinc-200 bg-zinc-50 focus-within:border-cyan-600/50 focus-within:ring-3 focus-within:ring-cyan-600/10";

const inputClassName = "h-9 text-sm placeholder:text-zinc-400";

export  function SignInForm() {
  const [rememberMe, setRememberMe] = useState(false);

 async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    console.log({ ...values, rememberMe });

    // Hook this up to the auth API when the backend is available.
    const { data:resData, error } = await signIn.email({
    email: values.email, // required, The email address of the user.
    password: values.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: rememberMe, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: '/destinations', // An optional URL to redirect to after the user signs in. (optional)
});

console.log(resData,error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-3">
        <Field className="gap-1">
          <FieldLabel htmlFor="email" className="text-xs text-zinc-900">
            Email Address
          </FieldLabel>
          <InputGroup className={inputGroupClassName}>
            <InputGroupAddon className="pl-3 text-zinc-500">
              <Mail className="size-[15px]" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className={inputClassName}
              required
            />
          </InputGroup>
        </Field>

        <Field className="gap-1">
          <FieldLabel htmlFor="password" className="text-xs text-zinc-900">
            Password
          </FieldLabel>
          <InputGroup className={inputGroupClassName}>
            <InputGroupAddon className="pl-3 text-zinc-500">
              <Lock className="size-[15px]" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className={inputClassName}
              required
            />
          </InputGroup>
        </Field>

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember-me"
            className="flex cursor-pointer items-center gap-2 text-xs text-zinc-600"
          >
            <Checkbox
              id="remember-me"
              name="rememberMe"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="border-zinc-300"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-cyan-600 hover:text-cyan-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-9 w-full rounded-[3px] bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-700 focus-visible:border-cyan-700 focus-visible:ring-cyan-600/30"
        >
          Sign In
        </Button>
      </FieldGroup>

      <div className="my-4 flex items-center gap-3">
        <Separator className="flex-1 bg-zinc-200" />
        <span className="whitespace-nowrap text-xs text-zinc-500">
          Or continue with
        </span>
        <Separator className="flex-1 bg-zinc-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-9 w-full gap-2.5 rounded-[3px] border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
      >
        <GoogleIcon className="size-[18px]" />
        Sign Up With Google
      </Button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-cyan-600 hover:text-cyan-700"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
