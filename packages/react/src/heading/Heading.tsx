import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";

type HeadingProps = TextProps<
  "h1",
  {
    /**
     * Presets for each level of heading h1-h6.
     */
    level?: keyof typeof mapLevelToTag;
  }
>;

const mapLevelToTag = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
  "5": "h5",
  "6": "h6",
} as const;
const mapLevelToFontSize = {
  "1": "5xl",
  "2": "4xl",
  "3": "3xl",
  "4": "2xl",
  "5": "xl",
  "6": "md",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, children, level = "1", ...props }, ref) => {
    const Comp = asChild ? Slot : mapLevelToTag[level];
    const fontSize = mapLevelToFontSize[level];

    return (
      <Text asChild fontSize={fontSize} fontWeight="700" ref={ref} {...props}>
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
