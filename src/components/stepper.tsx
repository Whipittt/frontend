import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Stepper({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
}: StepperProps) {
  const increment = () => onChange(Math.min(value + step, max));
  const decrement = () => onChange(Math.max(value - step, min));

  return (
    <div className="!w-fit flex items-center rounded-lg border ">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-16 rounded-none rounded-l-lg z-10"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={value <= min} 
        className="border-0 rounded-none border-r border-l"     
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={value >= max}
        className="border-0 rounded-none rounded-r-lg"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
