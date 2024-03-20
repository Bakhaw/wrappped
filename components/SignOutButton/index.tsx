"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

export default SignOutButton;