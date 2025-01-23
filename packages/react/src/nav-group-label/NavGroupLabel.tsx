import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { useNavGroupContext } from "../nav-group-context";

type NavGroupLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const NavGroupLabel = forwardRef<HTMLDivElement, NavGroupLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("NavGroupLabel");

    return (
      <Box color="fg.tertiary" fontSize="sm" id={id} p="8" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

NavGroupLabel.displayName = "@optiaxiom/react/NavGroupLabel";
