import { useId } from "@reach/auto-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { CommandGroupContextProvider } from "../command-group-context";

type CommandGroupProps = ComponentPropsWithoutRef<typeof Box>;

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <CommandGroupContextProvider id={groupId}>
        <Box aria-labelledby={groupId} ref={ref} role="group" {...props}>
          {children}
        </Box>
      </CommandGroupContextProvider>
    );
  },
);

CommandGroup.displayName = "@optiaxiom/react/CommandGroup";
