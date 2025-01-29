import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { DisclosureTrigger } from "../disclosure-trigger";
import { useNavGroupContext } from "../nav-group-context";

type NavGroupLabelProps = ComponentPropsWithoutRef<typeof DisclosureTrigger>;

export const NavGroupLabel = forwardRef<HTMLButtonElement, NavGroupLabelProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("NavGroupLabel");

    return (
      <DisclosureTrigger
        chevronPosition="end"
        color="fg.tertiary"
        fontSize="sm"
        id={id}
        mt="8"
        mx="8"
        px="12"
        py="4"
        ref={ref}
        w="auto"
        {...props}
      >
        {children}
      </DisclosureTrigger>
    );
  },
);

NavGroupLabel.displayName = "@optiaxiom/react/NavGroupLabel";
