"use client";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore, storage } from "@/firebase/firebase"; // Make sure to import storage and db
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import type { User } from "firebase/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Icons } from "@/app/Components/ui/Icons";

const Publish = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/Login");
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if there is an image to upload
      let imageUrl = "";
      if (imageFile) {
        // @ts-expect-error Shall work as expected
        const imageRef = ref(storage, `posts/${imageFile.name}-${Date.now()}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add form data and image URL to Firestore
      await addDoc(collection(firestore, "posts"), {
        author: user?.email,
        title,
        description,
        category,
        content,
        imageUrl, // Store the image URL in Firestore
        createdAt: new Date(),
        userId: user?.uid, // Reference to the user who created the post
      });

      // Reset form and redirect
      setTitle("");
      setDescription("");
      setCategory("");
      setContent("");
      setImageFile(null);
      router.push("/"); // Redirect to home or posts list page
      setLoading(false);
      toast.success("Post published successfully");
    } catch (error) {
      console.error("Error publishing post: ", error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="p-24">
      <Card>
        <CardHeader>
          <CardTitle>Publish A Post</CardTitle>
          <CardDescription>
            Publish your own post by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label>Title</Label>
            <Input
              placeholder="Put a title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
            <Label>Description</Label>
            <Input
              placeholder="Put a description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
            <Label>Category</Label>
            <Select
              onValueChange={(e) => {
                setCategory(e);
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Coding">Coding</SelectItem>
                <SelectItem value="Style">Style</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Culture">Culture</SelectItem>
              </SelectContent>
            </Select>
            <Label>Content</Label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={loading}
            />

            <Label>Image</Label>
            <Input
              disabled={loading}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <CardFooter className="mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Icons.spinner className="animate animate-spin w-8 h-8" />
                ) : (
                  "Publish"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Publish;
