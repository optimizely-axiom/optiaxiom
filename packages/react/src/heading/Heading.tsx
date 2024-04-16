import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Text } from "../text";
import { type ExtendProps, extractSprinkles } from "../utils";
import * as styles from "./Heading.css";

type HeadingProps = ExtendProps<
  ComponentPropsWithRef<"h1">,
  ComponentPropsWithRef<typeof Text>,
  {
    level?: keyof typeof mapLevelToTag;
  } & styles.Sprinkles
>;

const mapLevelToTag = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, children, level = 1, size: sizeProp, ...props }, ref) => {
    const Comp = asChild ? Slot : mapLevelToTag[level];
    const size = sizeProp ?? mapLevelToTag[level];

    return (
      <Text
        asChild
        fontWeight={700}
        ref={ref}
        {...extractSprinkles(styles.sprinkles, {
          size,
          ...props,
        })}
      >
        <Comp>{children}</Comp>
      </Text>
    );
  },
);

Heading.displayName = "@optiaxiom/react/Heading";
