import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Disclosure } from "../disclosure";
import { NavGroupContextProvider } from "../nav-group-context";

type NavGroupProps = BoxProps<"div", { defaultOpen?: boolean }>;

export const NavGroup = forwardRef<HTMLDivElement, NavGroupProps>(
  ({ children, defaultOpen = true, ...props }, ref) => {
    const groupId = useId();

    return (
      <NavGroupContextProvider id={groupId}>
        <Disclosure
          aria-labelledby={groupId}
          asChild
          defaultOpen={defaultOpen}
          ref={ref}
          role="group"
          {...props}
        >
          {children}
        </Disclosure>
      </NavGroupContextProvider>
    );
  },
);

NavGroup.displayName = "@optiaxiom/react/NavGroup";
