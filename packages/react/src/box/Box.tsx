import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import "inter-ui/inter-variable.css";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { type ExtendProps } from "../utils";
import * as styles from "./Box.css";
import { type Sprinkles, sprinkles } from "./Box.sprinkles";

type BoxProps = ExtendProps<
  ComponentPropsWithRef<"div">,
  {
    asChild?: boolean;
    className?: string;
  } & Sprinkles
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { className, ...restProps } = sprinkles(props);

    return (
      <Comp className={clsx(className, styles.base)} ref={ref} {...restProps} />
    );
  },
);

Box.displayName = "@optiaxiom/react/Box";
