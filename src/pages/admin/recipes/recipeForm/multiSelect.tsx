import * as React from "react";
import { Check } from "lucide-react";
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
import {
  PillSkeleton,
  PillWithClose,
} from "@/components/pill";

type MultiSelectProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  items: { value: string; label: string }[];
  itemName?: string;
  loading?: boolean;
};

export function MultiSelect({
  selected,
  setSelected,
  items,
  itemName,
  loading,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  function toggleItem(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function removeItem(value: string) {
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
            <CommandList>
              <CommandEmpty>
                No {itemName ? itemName : "item"} found.
              </CommandEmpty>

              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selected.includes(item.label);

                  return (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => toggleItem(item.label)}
                    >
                      {item.label}
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
          <>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <PillSkeleton key={i} />
                ))
              : selected.map((value) => {
                  const item = items.find((i) => i.value === value);

                  return (
                    <PillWithClose
                      key={value}
                      label={item?.label ?? value}
                      onRemove={() => removeItem(value)}
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
