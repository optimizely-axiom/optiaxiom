import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Stack.css";

type StackProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    align?: styles.Sprinkles["alignItems"];
    direction?: styles.Sprinkles["flexDirection"];
    gap?: styles.Sprinkles["gap"];
    justify?: styles.Sprinkles["justifyContent"];
  }
>;

const mapDirectionToAlign = {
  column: "stretch",
  horizontal: "center",
  row: "center",
  vertical: "stretch",
} as const;

const mapDirectionToJustify = {
  column: "center",
  horizontal: "start",
  row: "start",
  vertical: "center",
} as const;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { align, className, direction = "column", gap = "md", justify, ...props },
    ref,
  ) => {
    return (
      <Box
        className={clsx(
          className,
          styles.sprinkles({
            alignItems:
              align ??
              styles.mapValue(direction, (value) => mapDirectionToAlign[value]),
            flexDirection: direction,
            gap,
            justifyContent:
              justify ??
              styles.mapValue(
                direction,
                (value) => mapDirectionToJustify[value],
              ),
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
