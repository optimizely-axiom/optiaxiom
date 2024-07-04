import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Children, type ComponentPropsWithRef, forwardRef } from "react";

import type { Button } from "../button";
import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";

type DropdownTriggerProps = ExtendProps<
  ComponentPropsWithRef<typeof Button>,
  ComponentPropsWithRef<typeof RadixDropdownMenu.Trigger>
>;

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <Flex asChild>
      <RadixDropdownMenu.Trigger {...props} ref={ref}>
        {Children.map(children, (child) => (
          <Box>{child}</Box>
        ))}
      </RadixDropdownMenu.Trigger>
    </Flex>
  );
});

DropdownTrigger.displayName = "@optiaxiom/react/DropdownTrigger";
