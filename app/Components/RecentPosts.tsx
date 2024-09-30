"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PopularPosts from "./PopularPosts";
import DiscoverTopics from "./DiscoverTopics";
import Image from "next/image";
import { format } from "date-fns/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
type Posts = {
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
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from Firestore
    const fetchPosts = async () => {
      try {
        const postsRef = collection(firestore, "posts");
        const q = query(postsRef);
        const querySnapshot = await getDocs(q);
        const postsData: Posts[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          author: doc.data().author,
          isPopular: doc.data().isPopular,
          title: doc.data().title,
          date: doc.data().createdAt,
          category: doc.data().category,
          description: doc.data().description,
          image: doc.data().imageUrl || "", // Use imageUrl field from Firestore
          link: doc.data().link || "", // Use link field from Firestore
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
    <div className="ml-64 flex flex-row gap-1">
      {/* Recent Posts */}
      <div>
        <h1 className="font-bold text-3xl">Recent Posts</h1>
        {loading ? (
          <div className="p-5">
            <Card className="p-5">
              <CardContent>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-6 p-5">
                    <Skeleton className="w-[40vw] h-[35vh]" />
                  </div>
                  <div className="flex flex-row gap-6 p-5">
                    <Skeleton className="w-[40vw] h-[35vh]" />
                  </div>
                  <div className="flex flex-row gap-6 p-5">
                    <Skeleton className="w-[40vw] h-[35vh]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-5">
            <Card className="p-5">
              <CardContent>
                <div className="flex flex-col gap-5">
                  {posts.map((post: Posts) => (
                    <div key={post.id} className="flex flex-row gap-6 p-5">
                      {/* Display image if available */}
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="object-fit"
                          width={500}
                          height={30}
                        />
                      ) : (
                        <div className="w-96 h-64 bg-gray-300"></div>
                      )}
                      <div className="p-10">
                        {/* Date and Category */}
                        <div className="flex flex-row gap-2">
                          <p className="text-[14px]">
                            {/* @ts-expect-error This will work as expected */}
                            {format(post.date.toDate(), "dd-MMM-yyyy")}
                          </p>
                          <p className="text-[14px] text-orange-600 font-bold">
                            {" "}
                            - <Badge>{post.category}</Badge>
                          </p>
                        </div>
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <p className="text-gray-500">{post.description}</p>
                        <Button variant={"link"} className="underline">
                          <a href={`${`/Blog/${post.id}`}`}>Read More</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-10">
        {/* Popular Posts */}
        <PopularPosts />
        {/* Categories */}
        <DiscoverTopics />
      </div>
    </div>
  );
};
