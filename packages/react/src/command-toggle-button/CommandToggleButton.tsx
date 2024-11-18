import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { extractSprinkles } from "../sprinkles";

type CommandToggleButtonProps = BoxProps<"button">;

export const CommandToggleButton = forwardRef<
  HTMLButtonElement,
  CommandToggleButtonProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift } = useCommandContext("CommandToggleButton");
  return (
    <Box asChild {...sprinkleProps}>
      <button ref={ref} {...downshift.getToggleButtonProps(restProps)}>
        {children}
      </button>
    </Box>
  );
});

CommandToggleButton.displayName = "@optiaxiom/react/CommandToggleButton";
