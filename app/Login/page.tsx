"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

// TODO: 1. Create sign up page, then register the user in the database via the youtube tutorial.
// TODO: 2. Login the user, learn about auth session with firebase.
// TODO: 3. Only logged in users can publish posts.
// TODO: 4. Learn about uploading images with firebase.
// TODO: 5. Learn about fetching data from firebase.
// TODO: 6. Make sure page is responsive.
// TODO: 7. Page revalidation as well.
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
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
