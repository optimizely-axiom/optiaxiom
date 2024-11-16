import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type CommandEmptyProps = BoxProps;

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        alignItems="center"
        color="fg.disabled"
        display="flex"
        flexDirection="column"
        fontSize="md"
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
