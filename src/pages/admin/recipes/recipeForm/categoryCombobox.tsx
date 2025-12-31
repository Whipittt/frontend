import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PillSkeleton, PillWithClose } from "@/components/pill";
import { useRecipeCategoryData } from "@/hooks/useRecipeCategories";
import type { RecipeCategory } from "@/types";

type RestrictionComboboxProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  loading?: boolean;
};

export function CategoryCombobox({
  selected,
  setSelected,
  loading,
}: RestrictionComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const { data, isError, isLoading: isFetching } = useRecipeCategoryData();
  const categories = data ?? [];

  function toggleRestriction(cID: string) {
    setSelected((prev) =>
      prev.includes(cID) ? prev.filter((c) => c !== cID) : [...prev, cID]
    );
  }

  function removeRestriction(cID: string) {
    setSelected((prev) => prev.filter((c) => c !== cID));
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
            Select recipe categories...
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Enter category name..."
              className="h-9"
              noSearchIcon
            />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>

              <CommandGroup>
                {isFetching ? (
                  <div>Loading...</div>
                ) : isError ? (
                  <>
                    <div>Failed to load categories.</div>
                  </>
                ) : (
                  categories.map((category: RecipeCategory) => {
                    const isSelected = selected.includes(category.id ?? "");

                    return (
                      <CommandItem
                        key={category.name}
                        value={category.id}
                        onSelect={() => toggleRestriction(category.id ?? "")}
                      >
                        {category.name}
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
          <>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <PillSkeleton key={i} />
                ))
              : selected.map((cID) => {
                  const item = categories.find(
                    (c: RecipeCategory) => c.id === cID
                  );

                  return (
                    <PillWithClose
                      key={cID}
                      label={item?.name}
                      onRemove={() => removeRestriction(cID)}
                      className="bg-primary hover:bg-primary/80 text-sm"
                    />
                  );
                })}
          </>
        </div>
      )}
    </div>
  );
}
