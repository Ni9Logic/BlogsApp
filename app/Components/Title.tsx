import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

export const Title = () => {
  return (
    <BackgroundBeamsWithCollision>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center text-black dark:text-white font-sans tracking-tight">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center">
            <span>Hey,</span>
            <a
              href="https://github.com/Ni9Logic"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:text-purple-500 transition-colors duration-300"
            >
              Hassan R
            </a>
            <span>here.</span>
          </div>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 mt-4 sm:mt-6">
            <span className="font-bold">
              Discover my stories and creative ideas.
            </span>
          </div>
        </h2>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Title;
