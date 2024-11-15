import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { CommandSubContextProvider } from "../command-sub-context";

type CommandSubProps = BoxProps<
  "div",
  {
    item: unknown;
  }
>;

export const CommandSub = forwardRef<HTMLDivElement, CommandSubProps>(
  ({ children, item, ...props }, ref) => {
    return (
      <CommandSubContextProvider item={item}>
        <Box ref={ref} role="group" {...props}>
          {children}
        </Box>
      </CommandSubContextProvider>
    );
  },
);

CommandSub.displayName = "@optiaxiom/react/CommandSub";
