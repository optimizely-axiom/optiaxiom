import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";

type HeadingProps = TextProps<
  "h1",
  {
    /**
     * Control the visual size without changing the semantic tag.
     */
    appearance?: keyof typeof mapTagToFontSize;
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
const mapTagToFontSize = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "md",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ appearance, asChild, children, level = "1", ...props }, ref) => {
    const Comp = asChild ? Slot : mapLevelToTag[level];
    const fontSize = mapTagToFontSize[appearance ?? mapLevelToTag[level]];

    return (
      <Text asChild fontSize={fontSize} fontWeight="700" ref={ref} {...props}>
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
