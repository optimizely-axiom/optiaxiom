import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { useCommandGroupContext } from "../command-group-context";

type CommandLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const CommandLabel = forwardRef<HTMLDivElement, CommandLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useCommandGroupContext("CommandLabel");

    return (
      <Box
        color="fg.tertiary"
        fontSize="sm"
        id={id}
        p="xs"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

CommandLabel.displayName = "@optiaxiom/react/CommandLabel";
