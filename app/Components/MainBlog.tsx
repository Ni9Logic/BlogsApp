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
    <div className="p-4 md:p-24 lg:p-32 flex flex-col md:flex-row gap-10 items-center">
      <div className="w-full md:w-1/2 lg:w-2/5">
        <Image
          src={cultureImage}
          alt="culture image"
          width={300}
          height={300}
          layout="responsive"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center w-full md:w-1/2 lg:w-3/5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Simple ways to inspire your inner innovator.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Whether you&apos;re an inspiring artist, a curious thinker, or simply
          looking to add a touch of curiosity to your daily routine,
          our journey together will remind you that creativity has no bounds.
          Get ready to unlock a world of innovation and self-expression.
        </p>
        <Button
          variant={"outline"}
          className="w-32 mt-4"
          onClick={() => {
            setLoading(true);
            router.push("/Blog/Blog1");
          }}
        >
          {loading ? (
            <Icons.spinner className="animate-spin w-5 h-5" />
          ) : (
            "Read More"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MainBlog;
