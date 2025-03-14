import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import * as styles from "./CommandFocusableItem.css";

type CommandFocusableItemProps = BoxProps<"div">;

export const CommandFocusableItem = forwardRef<
  HTMLDivElement,
  CommandFocusableItemProps
>(({ children, className, ...props }, ref) => {
  const { lastInteractionSource } = useCommandContext(
    "@optiaxiom/react/CommandFocusableItem",
  );

  return (
    <Box
      data-focus-visible={lastInteractionSource === "keyboard" ? "" : undefined}
      ref={ref}
      {...styles.item({}, className)}
      {...props}
    >
      {children}
    </Box>
  );
});

CommandFocusableItem.displayName = "@optiaxiom/react/CommandFocusableItem";
