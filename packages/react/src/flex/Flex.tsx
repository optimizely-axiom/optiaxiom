import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { mapResponsiveValue } from "../sprinkles";

export type FlexProps = ComponentPropsWithRef<typeof Box>;

const mapDirectionToAlign = {
  column: "stretch",
  "column-reverse": "stretch",
  row: "center",
  "row-reverse": "center",
} as const;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ alignItems, flexDirection = "column", gap = "16", ...props }, ref) => {
    return (
      <Box
        alignItems={
          alignItems ??
          mapResponsiveValue(
            flexDirection,
            (value) => mapDirectionToAlign[value],
          )
        }
        display="flex"
        flexDirection={flexDirection}
        gap={gap}
        ref={ref}
        {...props}
      />
    );
  },
);

Flex.displayName = "@optiaxiom/react/Flex";
