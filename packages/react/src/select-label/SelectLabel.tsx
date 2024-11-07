import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { useSelectGroupContext } from "../select-group-context";

type SelectLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useSelectGroupContext("SelectLabel");

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

SelectLabel.displayName = "@optiaxiom/react/SelectLabel";
