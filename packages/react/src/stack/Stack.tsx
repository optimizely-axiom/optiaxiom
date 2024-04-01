import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "../box";

import { Box } from "../box";

type StackProps = Omit<
  ComponentPropsWithRef<"div"> & ComponentPropsWithRef<typeof Box>,
  "align" | "direction" | "gap" | "justify"
> & {
  align?: Sprinkles["alignItems"];
  direction?: Sprinkles["flexDirection"];
  gap?: Sprinkles["gap"];
  justify?: Sprinkles["justifyContent"];
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ align, direction, gap, justify, ...props }, ref) => {
    return (
      <Box
        alignItems={align ?? (direction === "row" ? "center" : "stretch")}
        display="flex"
        flexDirection={direction ?? "column"}
        gap={gap ?? "md"}
        justifyContent={justify ?? (direction === "row" ? "start" : "center")}
        ref={ref}
        {...props}
      />
    );
  },
);
