import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { extractSprinkles } from "../sprinkles";

type CommandListProps = BoxProps;

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { downshift, items } = useCommandContext("CommandList");
    if (!items.length) {
      return null;
    }

    return (
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        gap="2"
        overflow="auto"
        {...sprinkleProps}
        {...downshift.getMenuProps({ ref, ...restProps })}
      >
        {children}
      </Box>
    );
  },
);

CommandList.displayName = "@optiaxiom/react/CommandList";
