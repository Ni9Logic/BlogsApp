import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

export const Title = () => {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl md:text-4xl lg:text-7xl text-center text-black dark:text-white font-sans tracking-tight">
        <div className="flex flex-row gap-3 items-center text-center justify-center">
          Hey,
          <p className="font-bold">Hassan R </p>
          here.{" "}
        </div>
        <div className=" bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="font-bold">
            Discover my stories, and creative ideas.
          </span>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
};

export default Title;
