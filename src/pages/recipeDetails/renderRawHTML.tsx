import type { SetStateAction } from "react";

type RenderRawHTMLProps = {
  header: string;
  content: string;
  image?: {
    setImgOpen: (open: boolean) => void;
    setActiveImg: React.Dispatch<SetStateAction<string>>;
  };
};

export default function RenderRawHTML({
  header,
  content,
  image,
}: RenderRawHTMLProps) {
  const style: string =
    "max-w-none font-sans prose prose-invert list-disc list-inside space-y-4 text-foreground prose-img:rounded-lg prose-img:shadow prose-img:brightness-[0.85]";

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">{header}</h2>

      {image ? (
        <div
          className={style}
          onClick={(e) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "IMG") {
              const img = target as HTMLImageElement;
              image.setImgOpen(true);
              image.setActiveImg(img.src);
            }
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className={style} dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </section>
  );
}
