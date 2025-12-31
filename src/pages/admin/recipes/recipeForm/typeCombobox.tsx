import { MultiSelect } from "./multiSelect";

const types = [
  { value: "Breakfast", label: "Breakfast" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
  { value: "Snack", label: "Snack" },
];

type TypeComboboxProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  loading?: boolean;
};

export function TypeCombobox({
  selected,
  setSelected,
  loading,
}: TypeComboboxProps) {
  return (
    <MultiSelect
      loading={loading}
      selected={selected}
      setSelected={setSelected}
      items={types}
    />
  );
}
