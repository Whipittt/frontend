import {
  Dialog,
  DialogClose,
  DialogContentNoCloseBtn,
  DialogHeader,
} from "@/components/ui/dialog";
import logo from "@/assets/images/secondary-logo.png";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type NewRecipeCategoryProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  recipeTitle: string;
  ingredients: string[];
};

export function ShoppingListPopup({
  open,
  onOpenChange,
  recipeTitle,
  ingredients,
}: NewRecipeCategoryProps) {
  const downloadPDF = async () => {
    const element = document.getElementById("shopping-list");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${recipeTitle.toLocaleLowerCase()} shopping list.pdf`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContentNoCloseBtn className="sm:max-w-[425px] bg-transparent border-none">
        <DialogHeader className="mb-4">
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button size="sm" variant="accent" className="rounded-full">
                Go Back
              </Button>
            </DialogClose>

            <Button size="sm" className="rounded-full" onClick={downloadPDF}>
              Download
            </Button>
          </div>
        </DialogHeader>

        <div className="relative overflow-hidden" id="shopping-list">
          <div className="absolute top-0 left-0 w-full h-4 receipt-top rotate-180" />

          <div className="bg-white text-black px-6 py-8 flex flex-col gap-5 pt-10">
            <div>
              <img src={logo} alt="naijafoodie" className="h-6" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{recipeTitle}</span>
              <small>Shopping List</small>
            </div>

            <div>
              <ul className="list-inside list-decimal flex flex-col gap-1">
                {ingredients.map((ing) => (
                  <li key={ing} className="text-xs font-medium">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <Barcode
                value="d6ae8991-10297f2c9576"
                format="CODE128"
                className="w-3/4 p-0 h-auto m-auto"
              />
            </div>
          </div>
        </div>
      </DialogContentNoCloseBtn>
    </Dialog>
  );
}
