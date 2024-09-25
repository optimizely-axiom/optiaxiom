import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type SelectGroupProps = BoxProps<typeof RadixSelect.Group>;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, ...props }, ref) => (
    <Box asChild>
      <RadixSelect.Group ref={ref} {...props}>
        {children}
      </RadixSelect.Group>
    </Box>
  ),
);

SelectGroup.displayName = "@optiaxiom/react/SelectGroup";
