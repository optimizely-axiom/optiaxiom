import {
  IconBold,
  IconItalic,
  IconLink,
  IconList,
  IconListOl,
} from "@optiaxiom/icons";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useEffect } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Group } from "../group";
import { Tooltip } from "../tooltip";
import * as styles from "./RichTextEditor.css";

export type RichTextEditorProps = BoxProps<
  "div",
  {
    /**
     * Initial uncontrolled HTML content.
     */
    defaultValue?: string;
    /**
     * Name of the form control element. Used by form-data integrations.
     */
    name?: string;
    /**
     * Called when the editor content changes. Receives the new HTML string.
     */
    onValueChange?: (value: string) => void;
    /**
     * Placeholder text shown when the editor is empty.
     */
    placeholder?: string;
    /**
     * Whether the editor is read-only.
     */
    readOnly?: boolean;
    /**
     * Whether the field is required for form submission.
     */
    required?: boolean;
    /**
     * Controlled HTML content. Pair with `onValueChange`.
     */
    value?: string;
  }
>;

/**
 * Rich text editor with a toolbar for basic formatting (bold, italic, lists, links).
 *
 * @category form
 * @since 1.10.0
 */
export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      "aria-label": ariaLabel = "Rich text editor",
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultValue,
      onValueChange,
      placeholder,
      readOnly,
      value,
      ...props
    },
    ref,
  ) => {
    const editor = useEditor({
      content: value ?? defaultValue ?? "",
      editable: !readOnly,
      editorProps: {
        attributes: {
          role: "textbox",
          ...(ariaLabelledBy
            ? { "aria-labelledby": ariaLabelledBy }
            : { "aria-label": ariaLabel }),
        },
      },
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: placeholder ?? "" }),
      ],
      onUpdate: ({ editor }) => {
        onValueChange?.(editor.getHTML());
      },
    });

    useEffect(() => {
      if (editor && editor.isEditable === readOnly) {
        editor.setEditable(!readOnly);
      }
    }, [editor, readOnly]);

    useEffect(() => {
      if (editor && value !== undefined && value !== editor.getHTML()) {
        editor.commands.setContent(value, false);
      }
    }, [editor, value]);

    if (!editor) {
      return null;
    }

    const setLink = () => {
      const previous = editor.getAttributes("link").href as string | undefined;
      const url = window.prompt("Enter URL", previous ?? "");
      if (url === null) {
        return;
      }
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    };

    return (
      <Box ref={ref} {...styles.editor({}, className)} {...props}>
        {!readOnly && (
          <Group {...styles.toolbar()}>
            <Tooltip content="Bold">
              <Button
                appearance={editor.isActive("bold") ? "primary" : "subtle"}
                aria-label="Bold"
                icon={<IconBold />}
                onClick={() => editor.chain().focus().toggleBold().run()}
                size="sm"
              />
            </Tooltip>
            <Tooltip content="Italic">
              <Button
                appearance={editor.isActive("italic") ? "primary" : "subtle"}
                aria-label="Italic"
                icon={<IconItalic />}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                size="sm"
              />
            </Tooltip>
            <Tooltip content="Bullet list">
              <Button
                appearance={
                  editor.isActive("bulletList") ? "primary" : "subtle"
                }
                aria-label="Bullet list"
                icon={<IconList />}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                size="sm"
              />
            </Tooltip>
            <Tooltip content="Numbered list">
              <Button
                appearance={
                  editor.isActive("orderedList") ? "primary" : "subtle"
                }
                aria-label="Numbered list"
                icon={<IconListOl />}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                size="sm"
              />
            </Tooltip>
            <Tooltip content="Link">
              <Button
                appearance={editor.isActive("link") ? "primary" : "subtle"}
                aria-label="Link"
                icon={<IconLink />}
                onClick={setLink}
                size="sm"
              />
            </Tooltip>
          </Group>
        )}
        <EditorContent editor={editor} />
      </Box>
    );
  },
);

RichTextEditor.displayName = "@optiaxiom/react/RichTextEditor";
