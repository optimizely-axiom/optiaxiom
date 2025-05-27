import { forwardRef, type MouseEvent } from "react";

import { Box, type BoxProps } from "../box";
import { isFocusCaptured } from "../utils";
import { useInputContext } from "./InputContext";

export type InputAddonProps = BoxProps<"div">;

export const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  ({ children, ...props }, ref) => {
    const { addonPointerEvents, inputRef } = useInputContext(
      "@optiaxiom/react/InputAddon",
    );

    const addonProps =
      addonPointerEvents === "none"
        ? ({
            fontSize: "md",
            onPointerUp: (event: MouseEvent) => {
              if (isFocusCaptured(event)) {
                return;
              }

              event.preventDefault();
              event.stopPropagation();
              inputRef.current?.focus();
            },
          } as const)
        : ({
            fontSize: "md",
          } as const);

    return (
      <Box ref={ref} {...addonProps} {...props}>
        {children}
      </Box>
    );
  },
);

InputAddon.displayName = "@optiaxiom/react/InputAddon";
