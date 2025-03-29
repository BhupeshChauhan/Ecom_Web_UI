import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { cn } from "../../../../utils";

interface iRichTextBox {
  initialData: string;
  setData?: (data: string) => void;
  isReactOnly?: boolean;
  mounted?: string;
}
export default function RichTextBox({
  initialData,
  setData,
  isReactOnly = false,
  mounted = "true",
}: iRichTextBox) {
  const editorConfiguration: any = {
    toolbar: !isReactOnly
      ? [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "indent",
          "outdent",
        ]
      : [],
    heading: {
      options: [
        { model: "paragraph", title: "Paragraph", class: "custom-paragraph" },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
        },

        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
        },

        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
        },

        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
        },
      ],
    },
    plugins: [
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      Table,
      Undo,
    ],
    initialData: initialData,
  };

  return (
    <div className={cn(isReactOnly ? "readonly" : "")}>
      <CKEditor
        key={mounted}
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={(e, editor) => setData(editor.getData())}
        disabled={isReactOnly}
      />
    </div>
  );
}
