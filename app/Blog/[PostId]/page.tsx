import { firestore } from "@/firebase/firebase";
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
} from "@/components/ui/card";
import cultureImage from "@/app/public/culture.png";

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

export default async function BlogPost({ params }: { params: { PostId: string } }) {
  if (params.PostId === "Blog1") {
    return <DefaultBlogPost />;
  }

  const post = await getPostData(params.PostId);

  return post ? <BlogPostContent post={post} /> : <LoadingSkeleton />;
}

function DefaultBlogPost() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-3xl md:text-4xl font-bold">
            Simple ways to inspire your inner innovator.
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <p className="text-gray-600">By Hassan R</p>
            <Badge variant="outline">Culture</Badge>
            <p className="text-gray-600">9-30-2024</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <Image
              src={cultureImage}
              alt="Culture Image"
              width={800}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-2">Description</h2>
            <p className="text-lg text-gray-800">
              Whether you're an inspiring artist, a curious thinker, or simply
              looking to add a touch of curiosity to your daily routine, our journey
              together will remind you that creativity has no bounds. Get ready to
              unlock a world of innovation and self-expression.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-2">Content</h2>
            <p className="text-lg text-gray-800">Nothing More</p>
          </section>
        </CardFooter>
      </Card>
    </div>
  );
}

function BlogPostContent({ post }: { post: Post }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <p className="text-gray-600">By {post.author}</p>
            <Badge variant="outline">{post.category}</Badge>
            <p className="text-gray-600">{format(post.date, "dd-MMM-yyyy")}</p>
          </div>
        </CardHeader>
        <CardContent>
          {post.image && (
            <div className="mt-6">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-6">
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-2">Description</h2>
            <p className="text-lg text-gray-800">{post.description}</p>
          </section>
          <section>
            <h2 className="font-bold text-2xl md:text-3xl mb-2">Content</h2>
            <p className="text-lg text-gray-800">{post.content}</p>
          </section>
        </CardFooter>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Skeleton className="w-full h-[60vh] max-w-4xl mx-auto" />
    </div>
  );
}

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
        date: data.createdAt.toDate(),
        category: data.category,
        description: data.description,
        content: data.content,
        image: data.imageUrl || "",
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
