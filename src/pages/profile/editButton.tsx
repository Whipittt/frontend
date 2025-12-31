import { Button } from "@/components/ui/button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EditButton({
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn("rounded-full bg-transparent", className)}
      onClick={onClick}
      {...props}
    >
      <EditRoundedIcon />
      <span>Edit</span>
    </Button>
  );
}
