import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "./Box.css";

import * as styles from "./Box.css";

type BoxProps = Omit<ComponentPropsWithRef<"div">, "asChild" | "className"> &
  Sprinkles & {
    asChild?: boolean;
    className?: string;
  };

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const sprinkleProps: Record<string, unknown> = {};
    const restProps: Record<string, unknown> = {};

    for (const [prop, value] of Object.entries(props)) {
      if (styles.sprinkles.properties.has(prop as keyof Sprinkles)) {
        sprinkleProps[prop] = value;
      } else {
        restProps[prop] = value;
      }
    }

    return (
      <Comp
        className={clsx(
          className,
          styles.base,
          styles.sprinkles(sprinkleProps),
        )}
        ref={ref}
        {...restProps}
      />
    );
  },
);
