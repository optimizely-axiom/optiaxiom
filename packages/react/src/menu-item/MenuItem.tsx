import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./MenuItem.css";

type MenuItemProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixMenu.Item>,
  {
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, endDecorator, startDecorator, ...props }, ref) => {
    return (
      <Flex {...styles.wrapper()}>
        {startDecorator}
        <Flex asChild {...styles.item()}>
          <RadixMenu.Item {...props} ref={ref}>
            <Flex flexDirection="row">{children}</Flex>
          </RadixMenu.Item>
        </Flex>
        {endDecorator}
      </Flex>
    );
  },
);

MenuItem.displayName = "@optiaxiom/react/MenuItem";
