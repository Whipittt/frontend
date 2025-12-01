type RenderRawHTMLProps = {
  header: string;
  content: string;
};

export default function RenderRawHTML({ header, content }: RenderRawHTMLProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">{header}</h2>

      <div
        className="max-w-none font-sans prose prose-headings:text-secondary-foreground prose-headings:font-medium prose-headings:text-base list-disc list-inside space-y-4 !text-secondary-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
