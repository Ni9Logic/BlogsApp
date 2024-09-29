"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
export default function page() {
  return (
    <div className="p-24">
      <Button onClick={() => signIn("google")}>Log In</Button>
    </div>
  );
}
