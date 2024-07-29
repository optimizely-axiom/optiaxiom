import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";

type MenuTriggerProps = BoxProps<
  "button",
  ComponentPropsWithRef<typeof RadixMenu.Trigger>
>;

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex asChild>
        <RadixMenu.Trigger ref={ref} {...props}>
          {children}
        </RadixMenu.Trigger>
      </Flex>
    );
  },
);

MenuTrigger.displayName = "@optiaxiom/react/MenuTrigger";
