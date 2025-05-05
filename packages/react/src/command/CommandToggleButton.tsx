import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useCommandContext } from "./CommandContext";

export type CommandToggleButtonProps = BoxProps<"button">;

export const CommandToggleButton = forwardRef<
  HTMLButtonElement,
  CommandToggleButtonProps
>(({ children, className, ...props }, ref) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const { downshift } = useCommandContext(
    "@optiaxiom/react/CommandToggleButton",
  );
  return (
    <Box asChild className={className} {...boxProps}>
      <button ref={ref} {...downshift.getToggleButtonProps(restProps)}>
        {children}
      </button>
    </Box>
  );
});

CommandToggleButton.displayName = "@optiaxiom/react/CommandToggleButton";
