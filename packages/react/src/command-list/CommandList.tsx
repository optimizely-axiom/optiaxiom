import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { extractSprinkles } from "../sprinkles";

type CommandListProps = BoxProps<"ul">;

export const CommandList = forwardRef<HTMLUListElement, CommandListProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { downshift, items } = useCommandContext("CommandList");
    if (!items.length) {
      return null;
    }

    return (
      <Box
        asChild
        display="flex"
        flex="1"
        flexDirection="column"
        gap="2"
        overflow="auto"
        {...sprinkleProps}
      >
        <ul {...downshift.getMenuProps({ ref, ...restProps })}>{children}</ul>
      </Box>
    );
  },
);

CommandList.displayName = "@optiaxiom/react/CommandList";
