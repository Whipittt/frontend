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
import { PillWithClose } from "@/components/pill";
import { preferenceAPI } from "@/api/preferences";

type RestrictionComboboxProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export function RestrictionCombobox({
  selected,
  setSelected,
}: RestrictionComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [restrictions, setRestrictions] = React.useState<
    { id: string; name: string }[]
  >([]);

  React.useEffect(() => {
    async function fetchRestrictions() {
      setError(null);
      try {
        setIsLoading(true);
        const res = await preferenceAPI.fetchRestrictions();
        if (res) {
          setRestrictions(res);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dietary restrictions"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestrictions();
  }, []);

  function toggleRestriction(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function removeRestriction(value: string) {
    setSelected((prev) => prev.filter((v) => v !== value));
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
            Search...
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search restriction..."
              className="h-9"
              noSearchIcon
            />
            <CommandList>
              {isLoading ? (
                <div className="px-3 py-4 flex items-center text-sm">
                  <span>Fetching...</span>
                </div>
              ) : error ? (
                <div className="px-3 py-4 flex items-center text-sm">
                  <span className="text-destructive">{error}</span>
                </div>
              ) : (
                <>
                  <CommandEmpty>No restriction found.</CommandEmpty>
                  <CommandGroup>
                    {restrictions.map((restriction) => {
                      const isSelected = selected.includes(restriction.id);

                      return (
                        <CommandItem
                          key={restriction.id}
                          value={restriction.id}
                          onSelect={() => toggleRestriction(restriction.id)}
                        >
                          {restriction.name}
                          <Check
                            className={cn(
                              "ml-auto transition-opacity",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id) => {
            const item = restrictions.find((r) => r.id === id);

            return (
              <PillWithClose
                key={id}
                label={item?.name ?? "..."}
                onRemove={() => removeRestriction(id)}
                className="text-[#FFFFFF] bg-[#009862] hover:bg-[#009862]/90 rounded-xl text-sm font-normal"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
