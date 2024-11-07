import { useId } from "@reach/auto-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { SelectGroupContextProvider } from "../select-group-context";

type SelectGroupProps = ComponentPropsWithoutRef<typeof Box>;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <SelectGroupContextProvider id={groupId}>
        <Box aria-labelledby={groupId} ref={ref} role="group" {...props}>
          {children}
        </Box>
      </SelectGroupContextProvider>
    );
  },
);

SelectGroup.displayName = "@optiaxiom/react/SelectGroup";
