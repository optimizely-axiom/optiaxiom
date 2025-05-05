import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { ListboxGroupProvider } from "./ListboxGroupContext";

export type ListboxGroupProps = ComponentPropsWithoutRef<typeof Box>;

export const ListboxGroup = forwardRef<HTMLDivElement, ListboxGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <ListboxGroupProvider id={groupId}>
        <Box aria-labelledby={groupId} ref={ref} role="group" {...props}>
          {children}
        </Box>
      </ListboxGroupProvider>
    );
  },
);

ListboxGroup.displayName = "@optiaxiom/react/ListboxGroup";
