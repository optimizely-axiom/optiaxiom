import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { mapResponsiveValue } from "../sprinkles";

type FlexProps = ComponentPropsWithRef<typeof Box>;

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
