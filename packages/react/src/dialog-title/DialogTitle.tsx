import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Heading } from "../heading";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";

type DialogTitleProps = BoxProps<
  typeof RadixDialog.Title,
  {
    description?: string;
  }
>;

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
  ({ children, description, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex gap="xs" pb="md" pt="lg" px="lg" {...sprinkleProps}>
        <Heading asChild fontWeight="500" level="3">
          <RadixDialog.Title ref={ref} {...restProps}>
            {children}
          </RadixDialog.Title>
        </Heading>

        <Text asChild color="fg.secondary" empty="hidden" fontWeight="400">
          <RadixDialog.Description>{description}</RadixDialog.Description>
        </Text>
      </Flex>
    );
  },
);

DialogTitle.displayName = "@optiaxiom/react/DialogTitle";
