import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { NavGroupContextProvider } from "../nav-group-context";

type NavGroupProps = ComponentPropsWithoutRef<typeof Box>;

export const NavGroup = forwardRef<HTMLDivElement, NavGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <NavGroupContextProvider id={groupId}>
        <Box aria-labelledby={groupId} ref={ref} role="group" {...props}>
          {children}
        </Box>
      </NavGroupContextProvider>
    );
  },
);

NavGroup.displayName = "@optiaxiom/react/NavGroup";
