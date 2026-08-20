import { createSlot } from "@radix-ui/react-slot";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Text, type TextProps } from "../text";
import * as styles from "./Heading.css";

const Slot = createSlot("@optiaxiom/react/Heading");

export type HeadingProps<T extends ElementType = "h1", P = unknown> = TextProps<
  T,
  ExtendProps<
    {
      /**
       * Heading level (1-4) that controls the semantic HTML tag, font size, and
       * line height together (the sizes come from the design library, so don't
       * override `fontSize` directly).
       * - `level="1"`: renders `<h1>` at 50px/1.04 (default)
       * - `level="2"`: renders `<h2>` at 28px/1.04
       * - `level="3"`: renders `<h3>` at 20px/1.1
       * - `level="4"`: renders `<h4>` at 16px/1.3
       *
       * To use a level's visual size under a different semantic tag, combine
       * `level` with `asChild` (e.g. `<Heading asChild level="4"><h2>…`).
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
const mapLevelToFontWeight = {
  "1": "900",
  "2": "700",
  "3": "600",
  "4": "600",
} as const;
const mapLevelToTracking = {
  "1": "wide",
  "2": "wider",
  "3": "wider",
  "4": "widest",
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
    { asChild, children, className, fontWeight, level = "1", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : (mapLevelToTag[level] ?? "h1");

    return (
      <Text
        asChild
        fontWeight={fontWeight ?? mapLevelToFontWeight[level] ?? "700"}
        ref={ref}
        {...styles.heading(
          {
            level,
            tracking: mapLevelToTracking[level],
          },
          className,
        )}
        {...props}
      >
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
