"use client";
import Image from "next/image";
import cultureImage from "@/app/public/culture.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "./ui/Icons";
export const MainBlog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="md:p-24 p-4 md:ml-64   flex md:flex-row flex-col gap-10">
      <Image src={cultureImage} alt="culture image" width={400} height={5} />
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="text-4xl font-bold">
          Simple ways to inspire your inner innovator.
        </h1>
        <p className="text-gray-600">
          Wether you&apos;re an inspiring artist, a curious thinker, or simply
          looking to add a touch of curiosity to your daily routine,
          <br />
          Our journey together will remind you that creativity has no bounds.
          Get ready to unlock a world of innovation and self-expression.
        </p>
        <Button
          variant={"outline"}
          className="w-32"
          onClick={() => {
            setLoading(true);
            router.push("/Blog/Blog1");
          }}
        >
          {loading ? (
            <Icons.spinner className="animate animate-spin w-8 h-8" />
          ) : (
            "Read More"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MainBlog;
