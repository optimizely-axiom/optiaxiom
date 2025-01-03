import "@optiaxiom/globals/fonts";
import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { version } from "../../package.json";
import {
  extractSprinkles,
  type Sprinkles,
  sprinkles,
  sprinklesMerge,
} from "../sprinkles";
import * as styles from "./Box.css";

export type BoxProps<T extends ElementType = "div", P = unknown> = ExtendProps<
  ComponentPropsWithoutRef<T>,
  ExtendProps<
    Sprinkles & {
      /**
       * Change the default rendered element for the one passed as a child, merging their props and behavior.
       *
       * Read the {@link https://optimizely-axiom.github.io/optiaxiom/components/#composition Composition guide} for more details.
       */
      asChild?: boolean;
      className?: string;
    },
    P
  >
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Comp
        data-axiom={version}
        ref={ref}
        {...styles.box({}, sprinklesMerge(className, sprinkles(sprinkleProps)))}
        {...restProps}
      />
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
