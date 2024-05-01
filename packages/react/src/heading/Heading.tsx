import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";

type HeadingProps = ExtendProps<
  ComponentPropsWithRef<"h1">,
  ComponentPropsWithRef<typeof Box>,
  {
    level?: keyof typeof mapLevelToTag;
    variant?: keyof typeof mapTagToFontSize;
  }
>;

const mapLevelToTag = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
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
  ({ asChild, children, level = 1, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : mapLevelToTag[level];
    const fontSize = mapTagToFontSize[variant ?? mapLevelToTag[level]];

    return (
      <Box
        asChild
        fontFamily="sans"
        fontSize={fontSize}
        fontWeight="700"
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Box>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
