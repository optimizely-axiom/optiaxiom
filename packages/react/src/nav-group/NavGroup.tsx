import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Disclosure } from "../disclosure";
import { NavGroupProvider } from "../nav-group-context";

type NavGroupProps = ComponentPropsWithoutRef<typeof Disclosure>;

export const NavGroup = forwardRef<HTMLLIElement, NavGroupProps>(
  ({ children, ...props }, ref) => {
    const groupId = useId();

    return (
      <NavGroupProvider id={groupId}>
        <Disclosure
          alignItems="stretch"
          aria-labelledby={props["aria-label"] ? undefined : groupId}
          asChild
          defaultOpen
          display="flex"
          flexDirection="column"
          {...props}
        >
          <li ref={ref}>{children}</li>
        </Disclosure>
      </NavGroupProvider>
    );
  },
);

NavGroup.displayName = "@optiaxiom/react/NavGroup";
