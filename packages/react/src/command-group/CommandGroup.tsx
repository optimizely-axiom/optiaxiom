import { CommandGroup as CmdkCommandGroup } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommandGroup>;

export const CommandGroup = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandGroup ref={ref} {...restProps}>
          {children}
        </CmdkCommandGroup>
      </Box>
    );
  },
);

CommandGroup.displayName = "@optiaxiom/react/CommandGroup";
