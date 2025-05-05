import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { ButtonLoadable } from "./ButtonLoadable";

export type ButtonAddonProps = BoxProps<"div">;

export const ButtonAddon = forwardRef<HTMLDivElement, ButtonAddonProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonLoadable asChild>
        <Box display="flex" flex="none" ref={ref} {...props}>
          {children}
        </Box>
      </ButtonLoadable>
    );
  },
);

ButtonAddon.displayName = "@optiaxiom/react/ButtonAddon";
