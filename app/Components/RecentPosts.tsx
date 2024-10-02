"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PopularPosts from "./PopularPosts";
import DiscoverTopics from "./DiscoverTopics";
import Image from "next/image";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

type Post = {
  id: string;
  author: string;
  isPopular: boolean;
  title: string;
  date: Date;
  category: "Coding" | "Fashion" | "Food" | "Style" | "Travel" | "Culture";
  description: string;
  image: string;
  link: string;
};

export const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(firestore, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const postsData: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          author: doc.data().author,
          isPopular: doc.data().isPopular,
          title: doc.data().title,
          date: doc.data().createdAt.toDate(),
          category: doc.data().category,
          description: doc.data().description,
          image: doc.data().imageUrl || "",
          link: doc.data().link || "",
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-3xl mb-6">Recent Posts</h1>
          {loading ? (
            <Card className="p-4">
              <CardContent>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 mb-8">
                    <Skeleton className="w-full md:w-1/3 h-48" />
                    <div className="w-full md:w-2/3 space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="p-4">
              <CardContent>
                {posts.map((post: Post) => (
                  <div key={post.id} className="flex flex-col md:flex-row gap-6 mb-8 last:mb-0">
                    <div className="w-full md:w-1/3">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={500}
                          height={300}
                          className="object-cover w-full h-48 rounded"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-300 rounded"></div>
                      )}
                    </div>
                    <div className="w-full md:w-2/3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <time dateTime={post.date.toISOString()}>
                          {format(post.date, "dd MMM yyyy")}
                        </time>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <h2 className="text-xl font-bold">{post.title}</h2>
                      <p className="text-gray-600 line-clamp-2">{post.description}</p>
                      <Button variant="link" className="p-0 h-auto">
                        <a href={`/Blog/${post.id}`} className="text-blue-600 hover:underline">Read More</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        <div className="w-full lg:w-1/3 space-y-8">
          <PopularPosts />
          <DiscoverTopics />
        </div>
      </div>
    </div>
  );
};
