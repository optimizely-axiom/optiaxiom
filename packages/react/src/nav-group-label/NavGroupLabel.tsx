import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { DisclosureTrigger } from "../disclosure-trigger";
import { useNavGroupContext } from "../nav-group-context";

type NavGroupLabelProps = ComponentPropsWithoutRef<typeof Box>;

export const NavGroupLabel = forwardRef<HTMLDivElement, NavGroupLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("NavGroupLabel");

    return (
      <Box
        asChild
        color="fg.tertiary"
        fontSize="sm"
        id={id}
        p="8"
        ref={ref}
        {...props}
      >
        <DisclosureTrigger chevronPosition="end">{children}</DisclosureTrigger>
      </Box>
    );
  },
);

NavGroupLabel.displayName = "@optiaxiom/react/NavGroupLabel";
