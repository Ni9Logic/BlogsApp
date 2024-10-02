"use client";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icons } from "@/app/Components/ui/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          // Handle existing user if needed
        }
      } else {
        router.push("/Login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (!userDoc.exists()) {
          const registrationData = localStorage.getItem("registrationData");
          const { Name = "" } = registrationData ? JSON.parse(registrationData) : {};

          await setDoc(doc(firestore, "users", user.uid), {
            Name,
            Email: user.email,
          });

          router.push("/");
          toast.success("Login Successful");
        } else {
          router.push("/");
          toast.success("Welcome back!");
        }
      } else {
        toast.error("Please verify your email first!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{user ? "Sign Out" : "Sign In"}</CardTitle>
          <CardDescription>
            {user
              ? "You are already logged in. Click the button below to log out."
              : "Enter your email and password to sign in."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!user ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <a href="/Register" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </form>
          ) : (
            <Button onClick={handleLogout} className="w-full" disabled={loading}>
              {loading ? (
                <Icons.spinner className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {loading ? "Logging Out..." : "Log Out"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
