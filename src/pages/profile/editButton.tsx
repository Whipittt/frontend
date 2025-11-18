import { Button } from "@/components/ui/button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { type ButtonProps } from "@/components/ui/button";

export default function EditButton({ onClick, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="rounded-full bg-transparent"
      onClick={onClick}
      {...props}
    >
      <EditRoundedIcon />
      <span>Edit</span>
    </Button>
  );
}
