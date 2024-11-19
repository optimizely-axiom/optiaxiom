import { useId } from "@reach/auto-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { ListboxGroupContextProvider } from "../listbox-group-context";

type ListboxGroupProps = ComponentPropsWithoutRef<typeof Box>;

export const ListboxGroup = forwardRef<HTMLDivElement, ListboxGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <ListboxGroupContextProvider id={groupId}>
        <Box aria-labelledby={groupId} ref={ref} role="group" {...props}>
          {children}
        </Box>
      </ListboxGroupContextProvider>
    );
  },
);

ListboxGroup.displayName = "@optiaxiom/react/ListboxGroup";
