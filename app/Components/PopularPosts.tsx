"use client";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase"; // Import your configured Firestore
import { collection, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Posts = {
  id: string;
  author: string;
  isPopular: boolean;
  title: string;
  date: string; // We'll convert Firebase Timestamps to this format
  category: "Coding" | "Fashion" | "Food" | "Style" | "Travel" | "Culture";
  description: string;
  image: string;
  link: string;
};

const PopularPosts = () => {
  const [posts, setPosts] = useState<Posts[]>([]); // State to store posts
  const router = useRouter();

  // Function to fetch popular posts from Firestore
  const fetchPopularPosts = async () => {
    try {
      const postsRef = collection(firestore, "posts"); // Replace 'posts' with your collection name
      const querySnapshot = await getDocs(postsRef);

      const postsData: Posts[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author || "Unknown", // Ensure these fields match your Firestore data
          isPopular: data.isPopular,
          title: data.title,
          category: data.category,
          description: data.description,
          image: data.imageUrl || "", // Adjust for image field in your database
          link: data.link || "",
          date: format(data.createdAt.toDate(), "dd-MMM-yyyy"), // Format the Firestore Timestamp
        };
      });

      setPosts(postsData); // Update state with fetched posts
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  };

  useEffect(() => {
    fetchPopularPosts(); // Call the function to fetch posts on component mount
  }, []);

  return (
    <div>
      <p className="text-gray-500">What&apos;s hot 🔥</p>
      <h1 className="font-bold text-2xl">Most Popular</h1>
      <Card className="p-5">
        <CardContent className="p-5">
          <div className="mt-5">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div // Adjust the link to match your routing
                  key={index}
                  className="mt-10 hover:bg-gray-100 hover:cursor-pointer p-5"
                  onClick={() => router.push(`/Blog/${post.id}`)}
                >
                  <Badge variant={"destructive"} className="rounded-full">
                    {post.category}
                  </Badge>
                  <h1 className="text-xl font-bold">{post.title}</h1>
                  <p className="font-bold text-[12px] flex flex-row gap-2 items-center">
                    {post.author} -
                    <span className="font-semibold">{post.date}</span>
                  </p>
                  <p className="text-gray-500">{post.description}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-5">
                <Skeleton className="h-[15vh] w-[20vw]" />
                <Skeleton className="h-[15vh] w-[20vw]" />
                <Skeleton className="h-[15vh] w-[20vw]" />
                <Skeleton className="h-[15vh] w-[20vw]" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularPosts;
