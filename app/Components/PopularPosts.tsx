import { Badge } from "@/components/ui/badge";

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

const PopularPosts = () => {
  const posts: Posts[] = [
    {
      author: "Hassan R",
      isPopular: true,
      title: "Easiest way for react state management.",
      category: "Travel",
      date: "2024-9-29",
      description:
        "State management is one of the most important concepts in react world.",
      image: "",
      link: "",
    },
    {
      author: "Hassan R",
      isPopular: true,
      title: "Easiest way for react state management.",
      category: "Travel",
      date: "2024-9-29",
      description:
        "State management is one of the most important concepts in react world.",
      image: "",
      link: "",
    },
    {
      author: "Hassan R",
      isPopular: true,
      title: "Easiest way for react state management.",
      category: "Travel",
      date: "2024-9-29",
      description:
        "State management is one of the most important concepts in react world.",
      image: "",
      link: "",
    },
  ];
  return (
    <div>
      <p className="text-gray-500">What&apos;s hot 🔥</p>
      <h1 className="font-bold text-2xl">Most Popular</h1>
      <div className="mt-5">
        {posts.map((post) => (
          <div key={post.author} className="mt-10 hover:bg-gray-100 hover:cursor-pointer p-5">
            <Badge variant={"destructive"} className="rounded-full">
              {post.category}
            </Badge>
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p className="font-bold text-[12px] flex flex-row gap-2 items-center">
              {post.author} -
              <p className="font-semibold">{post.date}</p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PopularPosts;
