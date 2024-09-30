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

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
        }
      } else {
        router.push("/Login");
      }

      //   Cleanup function
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.push("/");
      toast.error("Logged out successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        const registrationData = localStorage.getItem("registrationData");
        const { Name = "" } = registrationData
          ? JSON.parse(registrationData)
          : {};

        // Check if user data exist in firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (!userDoc.exists()) {
          // Save user data to firestore after email verification
          await setDoc(doc(firestore, "users", user.uid), {
            Name,
            Email: user.email,
          });

          router.push("/");
          toast.success("Login Successful");
          setLoading(false);
        } else {
          toast.error("Please verify your email first!");
          setLoading(false);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      console.error(error);
      setLoading(false);
      return;
    }
  };
  return (
    <div>
      {!user ? (
        <form onSubmit={handleLogin}>
          <Label>Email</Label>
          <Input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Label>Password</Label>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
          />

          <p className="text-[12px] flex flex-row gap-2">
            Don&apos;t have an account?{" "}
            <a href="/Register" className="text-blue-500 underline">
              Sign Up
            </a>{" "}
          </p>
          <Button type="submit" className="mt-5">
            {loading ? (
              <Icons.spinner className="w-8 h-8 animate animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      ) : (
        <Button onClick={async () => handleLogout()}>
          {loading ? (
            <Icons.spinner className="animate animate-spin h-8 w-8" />
          ) : (
            <p>Log Out</p>
          )}
        </Button>
      )}
    </div>
  );
};

export default LoginForm;
