import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { forwardRef, type MutableRefObject, useEffect } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./InlineInput.css";

type InlineInputProps = BoxProps<
  "div",
  {
    defaultValue?: string;
    disabled?: boolean;
    editorRef?: MutableRefObject<Editor | null>;
    label: string;
    multiline?: boolean;
    onValueChange?: (value: string) => void;
    placeholder?: string;
  }
>;

export const InlineInput = forwardRef<HTMLDivElement, InlineInputProps>(
  (
    {
      className,
      defaultValue = "",
      disabled,
      editorRef,
      label,
      multiline,
      onValueChange,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const editor = useEditor({
      content: `<p>${
        multiline ? defaultValue.replace("\n", "</p><p>") : defaultValue
      }</p>`,
      editable: !disabled,
      editorProps: {
        attributes: {
          ...(label && { "aria-label": label }),
          "aria-multiline": String(multiline),
          "aria-readonly": String(Boolean(disabled)),
          role: "textbox",
          spellcheck: "true",
        },
      },
      extensions: [
        Document.extend({
          content: multiline ? "block+" : "block",
        }),
        History,
        Paragraph,
        Placeholder.configure({ placeholder: placeholder ?? label }),
        Text,
      ],
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        onValueChange?.(editor?.getText());
      },
    });

    useEffect(() => {
      if (!editorRef) {
        return;
      }

      editorRef.current = editor;
      return () => {
        editorRef.current = null;
      };
    });

    if (!editor) {
      return null;
    }

    return (
      <Box asChild ref={ref} {...styles.input({}, className)} {...props}>
        <EditorContent editor={editor} />
      </Box>
    );
  },
);

InlineInput.displayName = "@optiaxiom/react/InlineInput";
