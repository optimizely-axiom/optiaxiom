import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { mapResponsiveValue } from "../sprinkles";

type FlexProps = ComponentPropsWithRef<typeof Box>;

const mapDirectionToAlign = {
  column: "stretch",
  "column-reverse": "stretch",
  row: "center",
  "row-reverse": "center",
} as const;

const mapDirectionToJustify = {
  column: "center",
  "column-reverse": "center",
  row: "start",
  "row-reverse": "start",
} as const;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      alignItems,
      flexDirection = "column",
      gap = "md",
      justifyContent,
      ...props
    },
    ref,
  ) => {
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
        justifyContent={
          justifyContent ??
          mapResponsiveValue(
            flexDirection,
            (value) => mapDirectionToJustify[value],
          )
        }
        ref={ref}
        {...props}
      />
    );
  },
);

Flex.displayName = "@optiaxiom/react/Flex";
