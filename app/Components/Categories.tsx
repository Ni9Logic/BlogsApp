import { Badge } from "@/components/ui/badge";

type Categories = {
  name: string;
  variant: string;
  slug?: string;
};
const Categories = () => {
  const categories: Categories[] = [
    {
      name: "Fashion",
      variant: "default",
    },
    {
      name: "Food",
      variant: "green",
    },
    {
      name: "Coding",
      variant: "sky",
    },
    {
      name: "Style",
      variant: "orange",
    },
    {
      name: "Travel",
      variant: "lime",
    },
    {
      name: "Culture",
      variant: "green",
    },
  ];
  return (
    <div className="md:ml-64 p-4 flex flex-col gap-10">
      <h1 className="font-bold text-3xl">Categories</h1>
      <div className="flex flex-row gap-3 mb-5">
        {categories.map((category) => (
          <Badge
            key={category.name}
            // @ts-expect-error It shall work as expected.
            variant={category.variant}
            className="w-32 p-4 justify-center"
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Categories;
