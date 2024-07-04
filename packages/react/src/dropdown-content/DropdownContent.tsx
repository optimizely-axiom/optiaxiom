import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Box } from "../box";
import type { ExtendProps } from "../utils";

type DropdownContentProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithRef<typeof Box>
>;

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content {...props} ref={ref}>
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    );
  },
);

DropdownContent.displayName = "@optiaxiom/react/DropdownContent";
