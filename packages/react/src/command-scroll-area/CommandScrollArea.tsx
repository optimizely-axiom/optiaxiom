import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";

type CommandScrollAreaProps = ComponentPropsWithoutRef<typeof Box>;

export const CommandScrollArea = forwardRef<
  HTMLDivElement,
  CommandScrollAreaProps
>((props, ref) => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      gap="2"
      overflow="auto"
      ref={ref}
      {...props}
    />
  );
});

CommandScrollArea.displayName = "@optiaxiom/react/CommandScrollArea";
