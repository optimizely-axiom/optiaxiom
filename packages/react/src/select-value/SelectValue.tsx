import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";

type SelectValueProps = BoxProps<typeof RadixSelect.Value>;

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ ...props }, ref) => {
    const { value } = useSelectContext("SelectValue");

    return (
      <Box asChild>
        <RadixSelect.Value aria-label={value} ref={ref} {...props} />
      </Box>
    );
  },
);

SelectValue.displayName = "@optiaxiom/react/SelectValue";
