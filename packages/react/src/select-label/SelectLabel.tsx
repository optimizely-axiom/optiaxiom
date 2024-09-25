import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type SelectLabelProps = BoxProps<typeof RadixSelect.Label>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        asChild
        color="fg.tertiary"
        fontSize="sm"
        p="xs"
        ref={ref}
        {...props}
      >
        <RadixSelect.Label>{children}</RadixSelect.Label>
      </Box>
    );
  },
);

SelectLabel.displayName = "@optiaxiom/react/SelectLabel";
