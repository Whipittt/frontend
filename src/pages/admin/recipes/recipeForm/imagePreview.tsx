import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FileWarning } from "lucide-react";

type ImagePreviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageURL?: string;
};

type ImageStatus = "loading" | "loaded" | "error";

export default function ImagePreview({
  open,
  onOpenChange,
  imageURL,
}: ImagePreviewProps) {
  const [status, setStatus] = useState<ImageStatus>("loading");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus("loading");
      setZoomed(false);
    }
  }, [imageURL, open]);

  const isError = status === "error" || !imageURL;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-2">
        <DialogHeader>
          <h1 className="text-sm">Image Preview</h1>
        </DialogHeader>
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-md bg-muted"
        >
          {status === "loading" && (
            <Skeleton className="absolute inset-0 h-full w-full" />
          )}

          {!isError && (
            <img
              src={imageURL}
              alt="Preview image"
              loading="lazy"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onClick={() => setZoomed((z) => !z)}
              className={cn(
                "h-full w-full object-cover transition-all duration-500 ease-out",
                status === "loaded"
                  ? "opacity-100 blur-0"
                  : "opacity-0 blur-md",
                zoomed && "scale-110 cursor-zoom-out",
                !zoomed && "cursor-zoom-in"
              )}
            />
          )}

          {isError && (
            <div className="flex h-full w-full flex-col items-center justify-center bg-muted text-muted-foreground">
              <FileWarning/>
              <p className="mt-2 text-sm">Image not available</p>
            </div>
          )}
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
}
