import "@fontsource-variable/fira-code";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import "inter-ui/inter-variable.css";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { type Sprinkles, extractSprinkles, sprinkles } from "../sprinkles";
import * as styles from "./Box.css";

export type BoxProps<T extends ElementType = "div", P = unknown> = ExtendProps<
  ComponentPropsWithoutRef<T>,
  ExtendProps<
    {
      asChild?: boolean;
      className?: string;
    } & Sprinkles,
    P
  >
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Comp
        ref={ref}
        {...styles.box({}, clsx(className, sprinkles(sprinkleProps)))}
        {...restProps}
      />
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
