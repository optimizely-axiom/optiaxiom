import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";

type CommandEmptyProps = BoxProps;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, ...props }, ref) => {
    const { items } = useCommandContext("CommandEmpty");
    if (items.length > 0) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        color="fg.disabled"
        display="flex"
        fontSize="md"
        justifyContent="center"
        p="md"
        ref={ref}
        {...props}
      >
        {children || "No options"}
      </Box>
    );
  },
);

CommandEmpty.displayName = "@optiaxiom/react/CommandEmpty";
