import { Badge } from "@/components/ui/badge";

const DiscoverTopics = () => {
  return (
    <div>
      <p className="text-gray-500">Discover by topics</p>
      <h1 className="font-bold text-2xl">Categories</h1>
      <div className="flex flex-col gap-2 mt-10">
        <div className="flex flex-row gap-5">
          <Badge
            variant={"orange"}
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Style
          </Badge>
          <Badge
            variant={"sky"}
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Coding
          </Badge>
          <Badge
            variant={"green"}
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Food
          </Badge>
        </div>
        <div className="flex flex-row gap-5">
          <Badge
            variant={"lime"}
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Travel
          </Badge>
          <Badge
            variant={"green"}
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Culture
          </Badge>
          <Badge
            className="text-xl p-2 w-full justify-center rounded-full"
          >
            Fashion
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DiscoverTopics;
