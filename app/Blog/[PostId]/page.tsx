import { firestore } from "@/firebase/firebase"; // Adjust your firebase import accordingly
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cultureImage from "@/app/public/culture.png";

// Define a Post type to type the data fetched from Firestore
type Post = {
  id: string;
  author: string;
  title: string;
  date: Date;
  category: "Coding" | "Fashion" | "Food" | "Style" | "Travel" | "Culture";
  description: string;
  content: string;
  image: string;
  link: string;
};

export default async function page({ params }: { params: { PostId: string } }) {
  // Fetch the post data using the PostId parameter from the URL
  if (params.PostId === "Blog1")
    return (
      <div className="md:p-24 p-4 flex items-center justify-center">
        {/* Display the title and basic details */}
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-bold">
                Simple ways to inspire your inner innovator.
              </h1>
              <div className="flex md:flex-row flex-col gap-4 mt-2">
                <p className="text-gray-600">By Hassan R</p>
                <Badge
                  variant={"outline"}
                  className="flex justify-center text-center"
                >
                  Culture
                </Badge>
                <p className="text-gray-600">9-30-2024</p>
              </div>
            </CardTitle>
            <CardContent>
              {/* Display image if available */}

              <div className="mt-10">
                <Image
                  src={cultureImage}
                  alt="Culture Image"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-1 justify-start items-start">
              <h1 className="font-bold mt-5 text-3xl">Description</h1>
              <p className="text-xl text-gray-800">
                Wether you&apos;re an inspiring artist, a curious thinker, or
                simply looking to add a touch of curiosity to your daily
                routine, Our journey together will remind you that creativity
                has no bounds. Get ready to unlock a world of innovation and
                self-expression.
              </p>
              <h1 className="font-bold mt-5 text-3xl">Content</h1>
              <p className="text-xl text-gray-800">Nothing More</p>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    );
  const post = await getPostData(params.PostId);

  // Render the post details if the post exists
  return post ? (
    <div className="md:p-24 p-4 flex items-center justify-center">
      {/* Display the title and basic details */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex md:flex-row flex-col gap-4 mt-2">
              1<p className="text-gray-600">By {post.author}</p>
              <Badge
                variant={"outline"}
                className="flex justify-center text-center"
              >
                {post.category}
              </Badge>
              <p className="text-gray-600">
                {format(post.date, "dd-MMM-yyyy")}
              </p>
            </div>
          </CardTitle>
          <CardContent>
            {/* Display image if available */}
            {post.image && (
              <div className="mt-10">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-1 justify-start items-start">
            <h1 className="font-bold mt-5 text-3xl">Description</h1>
            <p className="text-xl text-gray-800">{post.description}</p>
            <h1 className="font-bold mt-5 text-3xl">Content</h1>
            <p className="text-xl text-gray-800">{post.content}</p>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  ) : (
    <Skeleton className="w-[50vw] h-[50vh]" />
  );
}

// Fetch the post data using Firestore based on the postId
async function getPostData(postId: string): Promise<Post | null> {
  try {
    const postRef = doc(firestore, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const data = postDoc.data();
      return {
        id: postDoc.id,
        author: data.author,
        title: data.title,
        date: data.createdAt.toDate(), // Convert Firestore timestamp to Date
        category: data.category,
        description: data.description,
        content: data.content,
        image: data.imageUrl || "", // Adjust field names as needed
        link: data.link || "",
      };
    } else {
      console.log("Post not found for ID:", postId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
