import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./MenuItem.css";

type MenuItemProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixMenu.Item>,
  ComponentPropsWithRef<typeof Flex>
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, onSelect, ...props }, ref) => {
    return (
      <Flex asChild {...styles.item()}>
        <RadixMenu.Item {...props} ref={ref}>
          {children}
        </RadixMenu.Item>
      </Flex>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
