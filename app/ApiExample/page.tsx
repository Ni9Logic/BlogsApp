"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ApiForm from "./components/ApiForm";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Retrieve Your GitHub Info</CardTitle>
          <CardDescription className="mt-2">
            Enter your GitHub username below to retrieve your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <ApiForm />
        </CardContent>
      </Card>
    </div>
  );
}
