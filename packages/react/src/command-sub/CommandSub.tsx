import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { CommandSubProvider } from "../command-sub-context";

type CommandSubProps = BoxProps<
  "div",
  {
    item: unknown;
  }
>;

export const CommandSub = forwardRef<HTMLDivElement, CommandSubProps>(
  ({ children, item, ...props }, ref) => {
    return (
      <CommandSubProvider item={item}>
        <Box ref={ref} role="group" {...props}>
          {children}
        </Box>
      </CommandSubProvider>
    );
  },
);

CommandSub.displayName = "@optiaxiom/react/CommandSub";
