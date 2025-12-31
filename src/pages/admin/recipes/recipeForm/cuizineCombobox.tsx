import * as React from "react";
import { MultiSelect } from "./multiSelect";

const cuzines = [
  { value: "Igbo", label: "Igbo" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Hausa", label: "Hausa" },
];

type CuzineComboboxProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  loading?: boolean;
};

export function CuzineCombobox({
  selected,
  setSelected,
  loading,
}: CuzineComboboxProps) {
  return (
    <MultiSelect
      selected={selected}
      setSelected={setSelected}
      items={cuzines}
      loading={loading}
    />
  );
}
