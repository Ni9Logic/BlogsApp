import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PopularPosts from "./PopularPosts";
import DiscoverTopics from "./DiscoverTopics";

type Posts = {
  author: string;
  isPopular: boolean;
  title: string;
  date: string;
  category: "Coding" | "Fashion" | "Food" | "Style" | "Travel" | "Culture";
  description: string;
  image: string;
  link: string;
};
export const RecentPosts = () => {
  const posts: Posts[] = [
    {
      author: "Hassan R",
      isPopular: true,
      title: "Easiest way for react state management.",
      category: "Coding",
      date: "2024-9-29",
      description:
        "State management is one of the most important concepts in react world.",
      image: "",
      link: "",
    },
  ];
  return (
    <div className="ml-64 flex flex-row gap-1">
      {/* Recent Posts */}
      <div>
        <h1 className="font-bold text-3xl">Recent Posts</h1>
        <div className="flex flex-col gap-5">
          {posts.map((post: Posts) => (
            <div key={post.date} className="flex flex-row gap-6 p-5">
              <div className="w-96 h-64 bg-gray-300"></div>
              <div className="p-10">
                {/* Date and Category */}
                <div className="flex flex-row gap-2">
                  <p className="text-[14px]">{post.date}</p>
                  <p className="text-[14px] text-orange-600 font-bold">
                    {" "}
                    - <Badge>{post.category}</Badge>
                  </p>
                </div>
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-gray-500 ">{post.description}</p>
                <Button variant={"link"} className="underline">
                  <a href={post.link}>Read More</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
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
