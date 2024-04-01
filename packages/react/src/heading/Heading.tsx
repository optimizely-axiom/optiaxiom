import type { ComponentPropsWithRef, ElementType } from "react";

import type { Sprinkles } from "../box";

import { forwardRef } from "../forwardRef";
import { Text } from "../text";

type HeadingProps<T extends ElementType = "h1"> = Omit<
  ComponentPropsWithRef<typeof Text<T>>,
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

export const Heading = forwardRef(
  <T extends ElementType = "h1">(
    { level: levelProp, size: sizeProp, ...props }: HeadingProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ) => {
    const level = levelProp ?? 1;
    const Component = mapLevelToTag[level];
    const size = sizeProp ?? mapLevelToTag[level];

    return (
      <Text
        as={Component}
        fontSize={size}
        fontWeight={700}
        lineHeight={size}
        ref={ref}
        {...props}
      />
    );
  },
);
