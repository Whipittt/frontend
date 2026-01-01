import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RecipeSupBrief } from "@/types";
import { Check, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RecipeAPI } from "@/api/recipes";
import { useUserRecipeRecommendationsCache } from "@/hooks/useRecipeData";

type RestrictionComboboxProps = {
  value: RecipeSupBrief | null;
  loading?: boolean;
  onSelect?: (selectedRecipe: RecipeSupBrief) => void;
};

export function RecipeCombobox({
  value,
  loading,
  onSelect,
}: RestrictionComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [recipes, setRecipes] = React.useState<RecipeSupBrief[]>([]);
  const [recipeSearchQuery, setRecipeSearchQuery] = React.useState("");

  const [selected, setSelected] = React.useState<RecipeSupBrief>();

  const { data } = useUserRecipeRecommendationsCache();

  React.useEffect(() => data && setRecipes(data.slice(0, 5)), [open]);

  React.useEffect(() => {
    let ignore = false;

    async function fetchRecipes() {
      const q = recipeSearchQuery.trim();

      if (!q) {
        setRecipes([]);
        setIsLoading(false);
        setIsError(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const res = (await RecipeAPI.filterRecipesByTitle(
          q,
          5
        )) as RecipeSupBrief[];

        if (!ignore) {
          setRecipes(res ?? []);
        }
      } catch (error) {
        if (!ignore) {
          setIsError(true);
          setRecipes([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => {
      ignore = true;
    };
  }, [recipeSearchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={loading}
          className="w-full justify-start px-2 shadow-none border-none text-muted-foreground hover:text-foreground/80"
        >
          {value ? (
            <span className="w-[95%] truncate text-left text-foreground">{value.title}</span>
          ) : (
            <>
              <Plus /> Add the recipe
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[300px] p-0" align="start">
        <Command>
          <Input
            placeholder="Search recipe..."
            className="h-9 focus-visible:ring-0"
            onChange={(e) => setRecipeSearchQuery(e.target.value)}
          />
          {isLoading ? (
            <CommandList>
              <CommandEmpty>Loading...</CommandEmpty>
            </CommandList>
          ) : isError ? (
            <CommandList>
              <CommandEmpty className="text-destructive">
                Failed to load recipes.
              </CommandEmpty>
            </CommandList>
          ) : (
            <CommandList className="scrollbar">
              <CommandEmpty>No recipe found.</CommandEmpty>
              <CommandGroup>
                {recipes.map((recipe) => (
                  <CommandItem
                    key={recipe.id}
                    value={recipe.id}
                    onSelect={(currentValue) => {
                      setSelected(
                        currentValue === selected?.id ? undefined : recipe
                      );
                      onSelect?.(recipe);
                      setOpen(false);
                    }}
                  >
                    <span className="w-[90%] text-nowrap truncate">
                      {recipe.title}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto",
                        selected?.id === recipe.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
