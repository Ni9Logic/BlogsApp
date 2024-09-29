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
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            If you are willing to contact us kindly fill out the form below.
          </CardDescription>
      </CardHeader>
        <CardContent>
          <form>
            <Label>Name</Label>
            <Input placeholder="Hassan R" required />
            <Label>Email</Label>
            <Input placeholder="iam@hassanr.me" required />
            <Label>Message</Label>
            <Input placeholder="Suggestion or Complaint" required />
          </form>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
