import { CommandEmpty as CmdkCommandEmpty } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type CommandProps = BoxProps<typeof CmdkCommandEmpty>;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandEmpty ref={ref} {...restProps}>
          {children || "No results found"}
        </CmdkCommandEmpty>
      </Box>
    );
  },
);

CommandEmpty.displayName = "@optiaxiom/react/CommandEmpty";
