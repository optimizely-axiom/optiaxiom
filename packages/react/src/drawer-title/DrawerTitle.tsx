import * as RadixDrawer from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Text } from "../text";

type DrawerTitleProps = BoxProps<
  typeof RadixDrawer.Title,
  {
    description?: string;
  }
>;

export const DrawerTitle = forwardRef<HTMLDivElement, DrawerTitleProps>(
  ({ children, description, ...props }, ref) => {
    return (
      <Flex gap="xs" pb="md" pt="lg" px="lg" ref={ref} {...props}>
        <Heading asChild level="4">
          <RadixDrawer.Title>{children}</RadixDrawer.Title>
        </Heading>

        <Text asChild empty="hidden" fontWeight="400">
          <RadixDrawer.Description>{description}</RadixDrawer.Description>
        </Text>
      </Flex>
    );
  },
);

DrawerTitle.displayName = "@optiaxiom/react/DrawerTitle";
