import React from "react";
import Title from "./Components/Title";
import MainBlog from "./Components/MainBlog";
import Categories from "./Components/Categories";
import { RecentPosts } from "./Components/RecentPosts";
import Footer from "./Components/ui/Footer";

export default function Home() {
  return (
    <div className="h-screen">
      <Title />
      <MainBlog />
      <Categories />
      <RecentPosts />
      <Footer />
    </div>
  );
}
