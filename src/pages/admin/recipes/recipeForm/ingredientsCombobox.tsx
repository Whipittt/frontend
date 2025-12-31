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
import { PillSkeleton, PillWithClose } from "@/components/pill";
import type { Ingredient } from "@/types";
import { Check } from "lucide-react";
import { ingredientsAPI } from "@/api/ingredients";
import { Input } from "@/components/ui/input";
import { CommandSeparator } from "cmdk";

type RestrictionComboboxProps = {
  selected: Ingredient[];
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  loading?: boolean;
};

export function IngredientsCombobox({
  selected,
  setSelected,
  loading,
}: RestrictionComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [ingredientNameQ, setingredientNameQ] = React.useState("");

  React.useEffect(() => {
    let ignore = false;

    async function fetchIngredients() {
      const q = ingredientNameQ.trim();

      if (!q) {
        setIngredients([]);
        setIsLoading(false);
        setIsError(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const res = await ingredientsAPI.searchByKeyword(q);
        if (!ignore) {
          setIngredients(res ?? []);
        }
      } catch (error) {
        if (!ignore) {
          setIsError(true);
          setIngredients([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchIngredients();

    return () => {
      ignore = true;
    };
  }, [ingredientNameQ]);

  function toggleRestriction(ingredient: Ingredient) {
    setSelected((prev) => {
      const exists = prev.some((i) => i.id === ingredient.id);
      return exists
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, ingredient];
    });
  }

  function removeRestriction(ingredient: Ingredient) {
    setSelected((prev) => prev.filter((i) => i.id !== ingredient.id));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full cursor-text justify-between border-none outline-none bg-[#202020] p-2 font-normal text-muted-foreground hover:text-muted-foreground hover:bg-[#202020]"
          >
            Select ingredients...
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <Input
              placeholder="Enter ingredient name..."
              className="h-9 focus-visible:ring-0"
              onChange={(e) => setingredientNameQ(e.target.value)}
            />
            <CommandSeparator />
            <CommandList className="scrollbar">
              {/* Only show "empty" when not loading and not error */}
              {!isLoading && !isError && (
                <CommandEmpty>No ingredient found.</CommandEmpty>
              )}

              <CommandGroup className="scrollbar">
                {isLoading ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : isError ? (
                  <div className="p-2 text-sm text-destructive">
                    Failed to load ingredients.
                  </div>
                ) : (
                  ingredients.map((ingredient: Ingredient) => {
                    const isSelected = selected.some(
                      (i) => i.id === ingredient.id
                    );

                    return (
                      <CommandItem
                        key={ingredient.id}
                        value={ingredient.id}
                        onSelect={() => toggleRestriction(ingredient)}
                      >
                        {ingredient.name}
                        <Check
                          className={cn(
                            "ml-auto transition-opacity",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <PillSkeleton key={i} />)
            : selected.map((ingredient) => (
                <PillWithClose
                  key={ingredient.id}
                  label={ingredient.name}
                  onRemove={() => removeRestriction(ingredient)}
                  className="bg-primary hover:bg-primary/80 text-sm"
                />
              ))}
        </div>
      )}
    </div>
  );
}
