import "@fontsource-variable/fira-code";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { type Sprinkles, extractSprinkles, sprinkles } from "../sprinkles";
import { type ExtendProps } from "../utils";
import * as styles from "./Box.css";

type BoxProps = ExtendProps<
  ComponentPropsWithRef<"div">,
  {
    asChild?: boolean;
    className?: string;
  } & Sprinkles
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Comp
        className={clsx(className, styles.base, sprinkles(sprinkleProps))}
        ref={ref}
        {...restProps}
      />
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
