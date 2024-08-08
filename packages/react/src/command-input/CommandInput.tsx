import { CommandInput as CmdkCommandInput } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommandInput>;

export const CommandInput = forwardRef<HTMLInputElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandInput ref={ref} {...restProps}>
          {children}
        </CmdkCommandInput>
      </Box>
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
