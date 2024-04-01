import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "../box";

import { Text } from "../text";

type HeadingProps = Omit<
  ComponentPropsWithRef<"h1"> & ComponentPropsWithRef<typeof Text>,
  "level" | "size"
> & {
  level?: keyof typeof mapLevelToTag;
  size?: Sprinkles["fontSize"];
};

const mapLevelToTag = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, children, level: levelProp, size: sizeProp, ...props }, ref) => {
    const level = levelProp ?? 1;
    const Comp = asChild ? Slot : mapLevelToTag[level];
    const size = sizeProp ?? mapLevelToTag[level];

    return (
      <Text
        asChild
        fontSize={size}
        fontWeight={700}
        lineHeight={size}
        ref={ref}
        {...props}
      >
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
