import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";

type ListboxScrollAreaProps = ComponentPropsWithoutRef<typeof Box>;

export const ListboxScrollArea = forwardRef<
  HTMLDivElement,
  ListboxScrollAreaProps
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

ListboxScrollArea.displayName = "@optiaxiom/react/ListboxScrollArea";
