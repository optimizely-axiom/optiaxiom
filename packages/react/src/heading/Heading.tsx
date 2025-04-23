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
       * Switch between the different h1-h6 levels.
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
  "3": "2xl",
  "4": "xl",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, children, level = "1", ...props }, ref) => {
    const Comp = asChild ? Slot : (mapLevelToTag[level] ?? "h1");
    const fontSize = mapLevelToFontSize[level] ?? "4xl";

    return (
      <Text asChild fontSize={fontSize} fontWeight="700" ref={ref} {...props}>
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
