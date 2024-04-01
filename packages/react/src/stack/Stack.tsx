import type { ComponentPropsWithRef, ElementType } from "react";

import type { Sprinkles } from "../box";

import { Box } from "../box";
import { forwardRef } from "../forwardRef";

type StackProps<T extends ElementType = "div"> = Omit<
  ComponentPropsWithRef<typeof Box<T>>,
  "align" | "direction" | "gap" | "justify"
> & {
  align?: Sprinkles["alignItems"];
  direction?: Sprinkles["flexDirection"];
  gap?: Sprinkles["gap"];
  justify?: Sprinkles["justifyContent"];
};

export const Stack = forwardRef(
  <T extends ElementType = "div">(
    { align, direction, gap, justify, ...props }: StackProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ) => {
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
