import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";

type SpotlightScrollAreaProps = ComponentPropsWithoutRef<typeof Box>;

export const SpotlightScrollArea = forwardRef<
  HTMLDivElement,
  SpotlightScrollAreaProps
>((props, ref) => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      gap="xs"
      overflow="auto"
      ref={ref}
      {...props}
    />
  );
});

SpotlightScrollArea.displayName = "@optiaxiom/react/SpotlightScrollArea";
