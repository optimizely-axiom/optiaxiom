import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Button } from "../button";
import type { ExtendProps } from "../utils";

import { Flex } from "../flex";

type MenuTriggerProps = ExtendProps<
  ComponentPropsWithRef<typeof Button>,
  ComponentPropsWithRef<typeof RadixMenu.Trigger>
>;

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex asChild>
        <RadixMenu.Trigger {...props} ref={ref}>
          {children}
        </RadixMenu.Trigger>
      </Flex>
    );
  },
);

MenuTrigger.displayName = "@optiaxiom/react/MenuTrigger";
