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
import { PillWithClose } from "@/pages/home/categorySection/categoryPill";

const restrictions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten_free", label: "Gluten-Free" },
  { value: "dairy_free", label: "Dairy-Free" },
  { value: "nut_free", label: "Nut-Free" },
  { value: "pescatarian", label: "Pescatarian" },
];


type RestrictionComboboxProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export function RestrictionCombobox({
  selected,
  setSelected,
}: RestrictionComboboxProps) {
  const [open, setOpen] = React.useState(false);

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

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search restriction..." className="h-9" />
            <CommandList>
              <CommandEmpty>No restriction found.</CommandEmpty>

              <CommandGroup>
                {restrictions.map((restriction) => {
                  const isSelected = selected.includes(restriction.value);

                  return (
                    <CommandItem
                      key={restriction.value}
                      value={restriction.value}
                      onSelect={() => toggleRestriction(restriction.value)}
                    >
                      {restriction.label}
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const item = restrictions.find((r) => r.value === value);

            return (
              <PillWithClose
                key={value}
                label={item?.label ?? value}
                onRemove={() => removeRestriction(value)}
                className="text-[#FFFFFF] bg-[#009862] hover:bg-[#009862]/90 rounded-xl text-sm font-normal"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
