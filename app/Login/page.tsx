"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function page() {
  return (
    <div className="p-24">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password in order to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Label>Email</Label>
            <Input type="email" required />
            <Label>Password</Label>
            <Input type="password" required />

            <p className="text-[12px] flex flex-row gap-2">
              Don&apos;t have an account?{" "}
              <a href="/Register" className="text-blue-500 underline">
                Sign Up
              </a>{" "}
            </p>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
