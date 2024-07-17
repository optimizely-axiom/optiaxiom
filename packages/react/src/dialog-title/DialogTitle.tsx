import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Heading } from "../heading";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";

type FooterProps = BoxProps<
  typeof RadixDialog.Title,
  {
    description?: string;
  }
>;

export const DialogTitle = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, description, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex gap="xs" pb="md" pt="lg" px="lg" {...sprinkleProps}>
        <Heading asChild level="4">
          <RadixDialog.Title ref={ref} {...restProps}>
            {children}
          </RadixDialog.Title>
        </Heading>
        {description && (
          <Text asChild fontWeight="400">
            <RadixDialog.Description>{description}</RadixDialog.Description>
          </Text>
        )}
      </Flex>
    );
  },
);

DialogTitle.displayName = "@optiaxiom/react/DialogTitle";
