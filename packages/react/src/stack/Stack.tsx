import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Stack.css";

type StackProps = Omit<
  ComponentPropsWithRef<"div"> & ComponentPropsWithRef<typeof Box>,
  "align" | "direction" | "gap" | "justify"
> & {
  align?: styles.Sprinkles["alignItems"];
  direction?: styles.Sprinkles["flexDirection"];
  gap?: styles.Sprinkles["gap"];
  justify?: styles.Sprinkles["justifyContent"];
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ align, className, direction, gap, justify, ...props }, ref) => {
    return (
      <Box
        className={clsx(
          className,
          styles.sprinkles({
            alignItems: align ?? (direction === "row" ? "center" : "stretch"),
            flexDirection: direction ?? "column",
            gap: gap ?? "md",
            justifyContent:
              justify ?? (direction === "row" ? "start" : "center"),
          }),
        )}
        display="flex"
        ref={ref}
        {...props}
      />
    );
  },
);

Stack.displayName = "@optiaxiom/react/Stack";
