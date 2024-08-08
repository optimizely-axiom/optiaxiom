import { Command as CmdkCommand } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommand>;

export const Command = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommand ref={ref} {...restProps}>
          {children}
        </CmdkCommand>
      </Box>
    );
  },
);

Command.displayName = "@optiaxiom/react/Command";
