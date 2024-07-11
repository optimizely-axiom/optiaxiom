import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./DropdownContent.css";

type DropdownContentProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithRef<typeof Box>
>;

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <RadixDropdownMenu.Portal>
        <Box asChild {...styles.content()}>
          <RadixDropdownMenu.Content {...props} ref={ref}>
            {children}
          </RadixDropdownMenu.Content>
        </Box>
      </RadixDropdownMenu.Portal>
    );
  },
);

DropdownContent.displayName = "@optiaxiom/react/DropdownContent";
