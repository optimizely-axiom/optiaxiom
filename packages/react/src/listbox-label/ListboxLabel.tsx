import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { useListboxGroupContext } from "../listbox-group-context";

type ListboxLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const ListboxLabel = forwardRef<HTMLDivElement, ListboxLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useListboxGroupContext("ListboxLabel");

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

ListboxLabel.displayName = "@optiaxiom/react/ListboxLabel";
