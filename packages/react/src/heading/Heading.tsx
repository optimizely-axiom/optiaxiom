import { createSlot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Text, type TextProps } from "../text";

const Slot = createSlot("@optiaxiom/react/Heading");

export type HeadingProps<T extends ElementType = "h1", P = unknown> = TextProps<
  T,
  ExtendProps<
    {
      /**
       * Heading level (1-4) that controls both the semantic HTML tag and font size.
       * - `level="1"`: renders `<h1>` with `fontSize="4xl"` (default)
       * - `level="2"`: renders `<h2>` with `fontSize="3xl"`
       * - `level="3"`: renders `<h3>` with `fontSize="2xl"`
       * - `level="4"`: renders `<h4>` with `fontSize="xl"`
       *
       * Use `asChild` to decouple the semantic level from visual appearance.
       */
      level?: keyof typeof mapLevelToTag;
    },
    P
  >
>;

const mapLevelToTag = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
} as const;
const mapLevelToFontSize = {
  "1": "4xl",
  "2": "3xl",
  "3": "xl",
  "4": "lg",
} as const;
const mapLevelToFontWeight = {
  "1": "900",
  "2": "900",
  "3": "500",
  "4": "600",
} as const;
const mapLevelToFontFamily = {
  "1": "heading",
  "2": "heading",
  "3": "heading",
  "4": "sans",
} as const;

/**
 * Renders semantic heading elements (h1-h4) for document structure and
 * accessibility.
 *
 * Use this for page titles, section headings, and any text that represents a
 * heading in the document outline. Don't use Text with large fontSize and bold
 * fontWeight for headings - Heading provides proper semantics for screen
 * readers and improves accessibility.
 *
 * When to use:
 * - Page titles
 * - Section headings
 * - Card/panel titles
 * - Any text with fontSize='xl'+ and fontWeight='500'+
 *
 * ⚠️ All heading levels (1-4) default to fontWeight="700". If your design shows
 * lighter headings, explicitly set fontWeight="500" or "600".
 *
 * Don't use Text component for headings - it lacks semantic meaning.
 *
 * @category typography
 * @since 0.1.0
 * @extends Text
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      asChild,
      children,
      fontFamily,
      fontWeight,
      level = "1",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : (mapLevelToTag[level] ?? "h1");
    const fontSize = mapLevelToFontSize[level] ?? "4xl";

    return (
      <Text
        asChild
        fontFamily={fontFamily ?? mapLevelToFontFamily[level] ?? "heading"}
        fontSize={fontSize}
        fontWeight={fontWeight ?? mapLevelToFontWeight[level] ?? "700"}
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
