"use client";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Post = {
  id: string;
  author: string;
  title: string;
  date: string;
  category: "Coding" | "Fashion" | "Food" | "Style" | "Travel" | "Culture";
  description: string;
  image: string;
  link: string;
};

const PopularPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPopularPosts = async () => {
    try {
      const postsRef = collection(firestore, "posts");
      const q = query(
        postsRef,
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q);

      const postsData: Post[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author || "Unknown",
          title: data.title,
          category: data.category,
          description: data.description,
          image: data.imageUrl || "",
          link: data.link || "",
          date: format(data.createdAt.toDate(), "dd MMM yyyy"),
        };
      });

      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-gray-500 text-sm md:text-base">What&apos;s hot 🔥</p>
      <h1 className="font-bold text-xl md:text-2xl mb-4">Most Popular</h1>
      <Card className="p-2 md:p-4">
        <CardContent className="p-2 md:p-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group hover:bg-gray-100 transition-colors duration-200 rounded-lg p-3 cursor-pointer"
                  onClick={() => router.push(`/Blog/${post.id}`)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200 mb-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {post.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularPosts;
