import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { RecipeBrief } from "@/types";
import { Link } from "react-router-dom";

type FavouriteRecipeCardProps = {
  data: RecipeBrief;
  onRemove?: (id: string) => void;
};

export default function FavouriteRecipeCard({
  data: recipe,
  onRemove,
}: FavouriteRecipeCardProps) {
  return (
    <div className="flex justify-between items-start gap-4">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="flex flex-col gap-1 w-full line-clamp-2">
          <span>{recipe.title}</span>
          <div className="flex gap-2 text-xs">
            <div className="flex gap-1 items-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1ZM6 3C5.86739 3 5.74021 3.05268 5.64645 3.14645C5.55268 3.24021 5.5 3.36739 5.5 3.5V6C5.50003 6.1326 5.55273 6.25975 5.6465 6.3535L7.1465 7.8535C7.2408 7.94458 7.3671 7.99498 7.4982 7.99384C7.6293 7.9927 7.75471 7.94011 7.84741 7.84741C7.94011 7.75471 7.9927 7.6293 7.99384 7.4982C7.99498 7.3671 7.94458 7.2408 7.8535 7.1465L6.5 5.793V3.5C6.5 3.36739 6.44732 3.24021 6.35355 3.14645C6.25979 3.05268 6.13261 3 6 3Z"
                  fill="#14D85C"
                />
              </svg>
              <span>{recipe.time_minutes} mins</span>
            </div>
            <div className="flex gap-1 items-center">
              <svg
                width="10"
                height="9"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.19244 0.345492C4.34212 -0.115164 4.99382 -0.115164 5.1435 0.345491L5.9028 2.68237C5.96973 2.88838 6.16171 3.02786 6.37832 3.02786H8.83547C9.31983 3.02786 9.52122 3.64767 9.12936 3.93237L7.14149 5.37664C6.96625 5.50397 6.89292 5.72965 6.95985 5.93566L7.71915 8.27254C7.86883 8.7332 7.34159 9.11626 6.94973 8.83156L4.96186 7.38729C4.78662 7.25996 4.54932 7.25996 4.37408 7.38729L2.38621 8.83156C1.99435 9.11626 1.46711 8.7332 1.61679 8.27254L2.37608 5.93566C2.44302 5.72965 2.36969 5.50397 2.19445 5.37664L0.206579 3.93237C-0.185278 3.64767 0.0161101 3.02786 0.500472 3.02786H2.95761C3.17423 3.02786 3.3662 2.88838 3.43314 2.68237L4.19244 0.345492Z"
                  fill="#FFDD5E"
                />
              </svg>
              <span>{recipe.rating}</span>
            </div>
          </div>
        </div>
      </Link>
      <Button
        variant="outline"
        className="rounded-full bg-transparent"
        onClick={() => onRemove?.(recipe.id)}
      >
        Remove
      </Button>
    </div>
  );
}

export function FavouriteRecipeCardSkeleton() {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex flex-col gap-1 w-full">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2 text-xs">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <Skeleton className="h-9 w-24 rounded-full" />
    </div>
  );
}
