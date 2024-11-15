import { forwardRef, type MouseEvent } from "react";

import { Box, type BoxProps } from "../box";
import { useInputContext } from "../input-context";

type InputAddonProps = BoxProps<"div">;

export const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  ({ children, ...props }, ref) => {
    const { addonPointerEvents, inputRef } = useInputContext("InputAddon");

    const addonProps =
      addonPointerEvents === "none"
        ? ({
            cursor: "text",
            fontSize: "md",
            onMouseDown: (event: MouseEvent) => {
              if (event.target !== event.currentTarget) {
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
