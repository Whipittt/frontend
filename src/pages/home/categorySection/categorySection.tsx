import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/useCategories";
import type { RecipeCategory } from "@/types/types";
import { Link } from "react-router-dom";

export default function CategorySection() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="px-4">
        <p className="text-sm text-muted-foreground">Loading categories...</p>
      </section>
    );
  }

  const categories = data ?? []; 

  return (
    <section id="categories" className="flex flex-col gap-6">
      <h2 className="text-sm md:px-0 px-4">Categories</h2>

      <div className="md:pl-0 pl-4 w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory hide-scrollbar">
        <Badge variant="active">
          <Link to="/">All</Link>
        </Badge>

        {categories.map((category: RecipeCategory) => (
          <Badge variant="muted" key={category.id}>
            <Link to="/">{category.name}</Link>
          </Badge>
        ))}
      </div>
    </section>
  );
}
