import { CommandSeparator as CmdkCommandSeparator } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommandSeparator>;

export const CommandSeparator = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandSeparator ref={ref} {...restProps}>
          {children}
        </CmdkCommandSeparator>
      </Box>
    );
  },
);

CommandSeparator.displayName = "@optiaxiom/react/CommandSeparator";
