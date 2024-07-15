import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";

type MenuProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixMenu.Root>
>;

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild ref={ref}>
        <RadixMenu.Root {...props}>{children}</RadixMenu.Root>
      </Flex>
    );
  },
);

Menu.displayName = "@optiaxiom/react/Menu";
