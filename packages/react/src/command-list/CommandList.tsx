import { CommandList as CmdkCommandList } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommandList>;

export const CommandList = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandList ref={ref} {...restProps}>
          {children}
        </CmdkCommandList>
      </Box>
    );
  },
);

CommandList.displayName = "@optiaxiom/react/CommandList";
