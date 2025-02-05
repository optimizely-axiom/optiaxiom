import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { DisclosureTrigger } from "../disclosure-trigger";
import { useNavGroupContext } from "../nav-group-context";

type NavGroupTriggerProps = ComponentPropsWithoutRef<typeof DisclosureTrigger>;

export const NavGroupTrigger = forwardRef<HTMLDivElement, NavGroupTriggerProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("NavGroupTrigger");

    return (
      <DisclosureTrigger
        chevronPosition="end"
        color="fg.tertiary"
        fontSize="sm"
        h="sm"
        id={id}
        mb="4"
        mt="8"
        px="12"
        ref={ref}
        w="auto"
        {...props}
      >
        {children}
      </DisclosureTrigger>
    );
  },
);

NavGroupTrigger.displayName = "@optiaxiom/react/NavGroupTrigger";
