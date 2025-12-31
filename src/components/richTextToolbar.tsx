import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
} from "lucide-react";

export default function RichTextToolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 p-2">
      <Select
        value={
          editor.isActive("heading", { level: 1 })
            ? "h1"
            : editor.isActive("heading", { level: 2 })
            ? "h2"
            : editor.isActive("heading", { level: 3 })
            ? "h3"
            : "paragraph"
        }
        onValueChange={(value) => {
          editor.chain().focus();

          if (value === "paragraph") {
            editor.chain().focus().setParagraph().run();
          } else {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: Number(value[1]) as 1 | 2 | 3 })
              .run();
          }
        }}
      >
        <SelectTrigger className="w-[140px] border-line focus:ring-0">
          <SelectValue placeholder="Text" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
        </SelectContent>
      </Select>

      <ToggleGroup type="multiple" size="sm">
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          data-state={editor.isActive("bold") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="italic"
          aria-label="Italic"
          data-state={editor.isActive("italic") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="underline"
          aria-label="Underline"
          data-state={editor.isActive("underline") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="strike"
          aria-label="Strike"
          data-state={editor.isActive("strike") ? "on" : "off"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="link"
          aria-label="Link"
          data-state={editor.isActive("link") ? "on" : "off"}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            const url = prompt("Enter URL");
            if (!url) return;

            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
