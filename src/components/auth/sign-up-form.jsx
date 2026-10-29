"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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

export function SignUpForm() {
  const [passwordError, setPasswordError] = useState("");

  const Router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    // FormData isn't a plain object, so `console.log(data)` shows nothing useful.
    // Object.fromEntries() turns every field into a readable key/value pair.
    const values = Object.fromEntries(data.entries());

    if (values.password !== values.confirmPassword) {
      setPasswordError("Passwords do not match.");
      form.querySelector("#confirm-password")?.focus();

      return;
    } else {
      const { data: resData, error } = await signUp.email({
        name: values.fullName, // required, The name of the user.
        email: values.email, // required, The email address of the user.
        password: values.confirmPassword, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      });

      Router.push("/");
    }

    setPasswordError("");
    // Hook this up to the auth API when the backend is available.
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-3">
        <Field className="gap-1">
          <FieldLabel htmlFor="full-name" className="text-xs text-zinc-900">
            Full Name
          </FieldLabel>
          <InputGroup className={inputGroupClassName}>
            <InputGroupAddon className="pl-3 text-zinc-500">
              <User className="size-[15px]" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="full-name"
              name="fullName"
              placeholder="Enter your name"
              autoComplete="name"
              className={inputClassName}
              required
            />
          </InputGroup>
        </Field>

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
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              className={inputClassName}
              required
            />
          </InputGroup>
        </Field>

        <Field
          className="gap-1"
          data-invalid={passwordError ? "true" : undefined}
        >
          <FieldLabel
            htmlFor="confirm-password"
            className="text-xs text-zinc-900"
          >
            Confirm Password
          </FieldLabel>
          <InputGroup className={inputGroupClassName}>
            <InputGroupAddon className="pl-3 text-zinc-500">
              <Lock className="size-[15px]" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              minLength={8}
              className={inputClassName}
              aria-invalid={passwordError ? true : undefined}
              aria-describedby={
                passwordError ? "confirm-password-error" : undefined
              }
              onInput={() => passwordError && setPasswordError("")}
              required
            />
          </InputGroup>
          <FieldError id="confirm-password-error">{passwordError}</FieldError>
        </Field>

        <Button
          type="submit"
          className="h-9 w-full rounded-[3px] bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-700 focus-visible:border-cyan-700 focus-visible:ring-cyan-600/30"
        >
          Create Account
        </Button>
      </FieldGroup>

      <div className="my-4 flex items-center gap-3">
        <Separator className="flex-1 bg-zinc-200" />
        <span className="whitespace-nowrap text-xs text-zinc-500">
          Or sign up with
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
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-cyan-600 hover:text-cyan-700"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
