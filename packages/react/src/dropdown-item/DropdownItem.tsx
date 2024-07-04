import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";

type DropdownItemProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithRef<typeof Flex>
>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, onSelect, ...props }, ref) => {
    return (
      <Flex asChild>
        <RadixDropdownMenu.Item {...props} ref={ref}>
          {children}
        </RadixDropdownMenu.Item>
      </Flex>
    );
  },
);

DropdownItem.displayName = "@optiaxiom/react/DropdownItem";
