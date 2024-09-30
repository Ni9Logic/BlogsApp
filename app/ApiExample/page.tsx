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
    <div className="p-24">
      <Card>
        <CardHeader>
          <CardTitle>Retrieve your github Info</CardTitle>
          <CardDescription>
            Enter your github username below to retrieve your github info
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiForm />
        </CardContent>
      </Card>
    </div>
  );
}
