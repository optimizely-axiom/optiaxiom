import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { type Sprinkles, sprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./Box.css";

type BoxProps = ExtendProps<
  ComponentPropsWithRef<"div">,
  {
    [Key in keyof Sprinkles as Key extends `:${string}`
      ? never
      : Key]: Sprinkles[Key];
  } & {
    asChild?: boolean;
    className?: string;
  } & { sx?: Sprinkles }
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, style, sx = {}, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    const sprinkleProps: Sprinkles = {};
    const restProps: Record<string, unknown> = {};

    for (const [name, value] of Object.entries(props)) {
      if (sprinkles.properties.has(name as never)) {
        // @ts-expect-error -- too complex
        sprinkleProps[name] = value;
      } else {
        restProps[name] = value;
      }
    }

    const css = sprinkles({ ...sprinkleProps, ...sx });

    return (
      <Comp
        className={clsx(className, styles.base, css.className)}
        ref={ref}
        style={{
          ...css.style,
          ...style,
        }}
        {...restProps}
      />
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
