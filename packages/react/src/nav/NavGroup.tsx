import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Disclosure } from "../disclosure";
import { Flex } from "../flex";
import { NavGroupProvider } from "./NavGroupContext";

export type NavGroupProps = ComponentPropsWithoutRef<typeof Disclosure> & {
  /**
   * Whether the nav group should be collapsible or not.
   */
  collapsible?: boolean;
};

export const NavGroup = forwardRef<HTMLDivElement, NavGroupProps>(
  (
    { children, collapsible, defaultOpen = true, onOpenChange, open, ...props },
    ref,
  ) => {
    const groupId = useId();

    return (
      <Flex asChild>
        <li>
          <NavGroupProvider collapsible={collapsible} id={groupId}>
            <Disclosure
              alignItems="stretch"
              aria-labelledby={props["aria-label"] ? undefined : groupId}
              defaultOpen
              display="flex"
              flexDirection="column"
              ref={ref}
              role="group"
              {...(collapsible && { defaultOpen, onOpenChange, open })}
              {...props}
            >
              {children}
            </Disclosure>
          </NavGroupProvider>
        </li>
      </Flex>
    );
  },
);

NavGroup.displayName = "@optiaxiom/react/NavGroup";
