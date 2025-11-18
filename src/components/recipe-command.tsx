import { useState } from "react";
import img from "@/assets/images/placeholderUserImage.png";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function RecipeCommand() {
  const [query, setQuery] = useState("");
  const isInput = query.trim() !== "";

  return (
    <div className="relative">
      <Command className="rounded-full w-full">
        <CommandInput
          placeholder="Enter available ingredients..."
          value={query}
          onValueChange={setQuery}
        />
      </Command>

      {isInput && (
        <div
          className="
            absolute left-0 top-full mt-2 w-full
            rounded-xl shadow-md bg-background
            z-50
          "
        >
          <Command className="rounded-xl">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {[
                  "Ero riro",
                  "Beans and Egg",
                  "Rice and okpa",
                  "Chicken stew and agidi",
                ].map((text) => (
                  <CommandItem key={text}>
                    <div className="flex gap-4 items-center">
                      <img
                        src={img}
                        alt=""
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span>{text}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
