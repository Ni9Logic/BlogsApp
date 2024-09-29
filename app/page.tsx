import React from "react";
import Title from "./Components/Title";
import MainBlog from "./Components/MainBlog";
import Categories from "./Components/Categories";

export default function Home() {
  return (
    <div className="h-screen">
      <Title />
      <MainBlog />
      <Categories />
    </div>
  );
}
