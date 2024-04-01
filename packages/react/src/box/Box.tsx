import clsx from "clsx";
import { type ComponentPropsWithRef, type ElementType } from "react";

import type { Sprinkles } from "./Box.css";

import { forwardRef } from "../forwardRef";
import * as styles from "./Box.css";

type BoxProps<T extends ElementType = "div"> = Omit<
  ComponentPropsWithRef<T>,
  "as"
> &
  Sprinkles & {
    /** Can be set to any intrinsic element or arbitrary component. */
    as?: T;
    className?: string;
  };

export const Box = forwardRef(
  <T extends ElementType = "div">(
    { as, className, ...props }: BoxProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ) => {
    const Tag = as ?? "div";

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
      <Tag
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
