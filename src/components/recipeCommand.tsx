import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { PillWithClose } from "@/pages/home/categorySection/categoryPill";
import { useNavigate } from "react-router-dom";
import { ingredientsAPI } from "@/api/ingredients";

type IngredientLike = string | { id?: string | number; name: string };

function toName(item: IngredientLike): string {
  if (typeof item === "string") return item;
  return item?.name ?? "";
}

export function RecipeCommand() {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trimmedQuery = query.trim();

  const shouldShowDropdown = isOpen && trimmedQuery.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function run() {
      if (trimmedQuery.length === 0) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const results: IngredientLike[] =
          (await ingredientsAPI.searchByKeyword(trimmedQuery)) ?? [];
        if (!active) return;

        const names = results
          .map(toName)
          .filter(Boolean)
          .filter((name, idx, arr) => arr.indexOf(name) === idx);

        const filteredNames = names.filter(
          (n) => !selectedIngredients.includes(n)
        );

        setSuggestions(filteredNames);
      } catch (e) {
        if (active) {
          setSuggestions([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    const t = setTimeout(run, 300);
    return () => {
      active = false;
      controller.abort();
      clearTimeout(t);
    };
  }, [trimmedQuery, selectedIngredients]);

  const addIngredient = (name: string) => {
    if (!name) return;
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients((prev) => prev.filter((n) => n !== name));
  };

  const onSearch = () => {
    const finalSelected =
      selectedIngredients.length > 0
        ? selectedIngredients
        : trimmedQuery
        ? [trimmedQuery]
        : [];

    if (finalSelected.length === 0) {
      return;
    }

    const params = new URLSearchParams();
    for (const ing of finalSelected) {
      params.append("ingredient", ing);
    }

    navigate(`/recipes/ingredients?${params.toString()}`);
  };

  const handleValueChange = (val: string) => {
    setQuery(val);
    setIsOpen(true);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const showEmpty =
    !loading && trimmedQuery.length > 0 && suggestions.length === 0;

  return (
    <div className="relative" ref={containerRef}>
      <Command className="rounded-full w-full">
        <CommandInput
          placeholder="Enter available ingredients..."
          value={query}
          onValueChange={handleValueChange}
          onFocus={() => setIsOpen(true)}
          onSearchClick={onSearch as any}
          onKeyDown={handleKeyDown}
        />
      </Command>

      {shouldShowDropdown && (
        <div
          className="
            absolute left-0 top-full mt-2 w-full
            rounded-xl shadow-md bg-background
            z-50
          "
        >
          <Command className="rounded-xl ">
            <CommandList className="scrollbar">
              <CommandGroup
                heading="Selected Ingredients"
                className="sticky top-0 bg-popover z-50"
              >
                <div className="flex flex-wrap gap-2 p-2 py-4">
                  {selectedIngredients.length === 0 ? (
                    <span className="text-sm text-muted-foreground px-2">
                      No ingredients selected yet.
                    </span>
                  ) : (
                    selectedIngredients.map((text) => (
                      <PillWithClose
                        label={text}
                        onRemove={() => removeIngredient(text)}
                      />
                    ))
                  )}
                </div>
                <CommandSeparator />
              </CommandGroup>

              <CommandGroup heading="Ingredient suggestions">
                <div className="p-2">
                  {loading && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Searching...
                    </div>
                  )}

                  {showEmpty && <CommandEmpty>No results found.</CommandEmpty>}

                  {suggestions.map((text) => (
                    <CommandItem
                      key={text}
                      value={text}
                      onSelect={() => addIngredient(text)}
                    >
                      <div className="flex gap-4 items-center">
                        <span>{text}</span>
                      </div>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
