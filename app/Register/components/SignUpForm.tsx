"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Icons } from "@/app/Components/ui/Icons";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await sendEmailVerification(user);

      //   Temporarily store user object in local storage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({ name, email, password, confirmPassword })
      );

      toast.success("Registration Successful! Please verify your email.");

      //   Clear Form Fields
      setName("");
      setEmail("");
      setConfirmPassword("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else console.error(error);
      setLoading(false);
      return false;
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <Label>Full Name</Label>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="John Doe"
        disabled={loading}
        required
      />
      <Label>Email</Label>
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="JohDoe@doe.com"
        disabled={loading}
        required
      />
      <Label>Password</Label>
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="***************"
        disabled={loading}
        required
      />
      <Label>Confirm Password</Label>
      <Input
        onChange={(e) => {
          {
            setConfirmPassword(e.target.value);
          }
        }}
        type="password"
        placeholder="***************"
        disabled={loading}
        required
      />
      <Button type="submit" className="mt-5">
        {loading ? (
          <Icons.spinner className="animate animate-spin w-8 h-8" />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
