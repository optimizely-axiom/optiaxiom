import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type FooterProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixDialog.Title>
>;

export const DialogTitle = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex
        asChild
        fontSize="2xl"
        fontWeight="600"
        mb="0"
        pb="16"
        pt="24"
        px="24"
        {...sprinkleProps}
      >
        <RadixDialog.Title ref={ref} {...restProps}>
          {children}
        </RadixDialog.Title>
      </Flex>
    );
  },
);

DialogTitle.displayName = "@optiaxiom/react/DialogTitle";
