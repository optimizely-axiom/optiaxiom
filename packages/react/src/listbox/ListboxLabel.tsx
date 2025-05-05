import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { useListboxGroupContext } from "./ListboxGroupContext";

export type ListboxLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const ListboxLabel = forwardRef<HTMLDivElement, ListboxLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useListboxGroupContext("@optiaxiom/react/ListboxLabel");

    return (
      <Box color="fg.tertiary" fontSize="sm" id={id} p="8" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

ListboxLabel.displayName = "@optiaxiom/react/ListboxLabel";
