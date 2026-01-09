import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import RichTextToolbar from "./richTextToolbar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface RichTextEditorProps {
  value?: JSONContent | string;
  setHTML?: (value: string) => void;
  setJSON?: (value: JSONContent) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  setHTML,
  setJSON,
  placeholder = "Start typing...",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({
        placeholder,
      }),

      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "h-[190px] prose-invert prose prose-sm prose-base max-w-none focus:outline-none text-foreground",
      },
    },
    onUpdate({ editor }) {
      setHTML?.(editor.getHTML());
      setJSON?.(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor || value == null) return;

    if (typeof value === "string") {
      const currentHTML = editor.getHTML();
      if (currentHTML !== value) {
        editor.commands.setContent(value, {});
      }
      return;
    }

    const currentJSON = editor.getJSON();
    if (JSON.stringify(currentJSON) !== JSON.stringify(value)) {
      editor.commands.setContent(value, {});
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={cn("rounded-md bg-[#202020]", className)}>
      <RichTextToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="h-[250px] px-3 py-1 overflow-auto scrollbar"
      />
    </div>
  );
}
