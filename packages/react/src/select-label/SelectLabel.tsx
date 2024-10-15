import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";

type SelectLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        color="fg.default"
        fontSize="md"
        fontWeight="600"
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
