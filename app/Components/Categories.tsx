import { Badge } from "@/components/ui/badge";

type Category = {
  name: string;
  variant: "default" | "green" | "sky" | "orange" | "lime";
};

const Categories = () => {
  const categories: Category[] = [
    { name: "Fashion", variant: "default" },
    { name: "Food", variant: "green" },
    { name: "Coding", variant: "sky" },
    { name: "Style", variant: "orange" },
    { name: "Travel", variant: "lime" },
    { name: "Culture", variant: "green" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="font-bold text-2xl md:text-3xl mb-4 md:mb-6">Categories</h1>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((category) => (
          <Badge
            key={category.name}
            variant={category.variant}
            className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Categories;
