import * as RadixDialog from "@radix-ui/react-dialog";
import {
  Children,
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";

type FooterProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
  }
>;

export const DialogFooter = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        {...props}
        alignItems="center"
        flexDirection="row"
        gap="sm"
        justifyContent="end"
        ref={ref}
      >
        {Children.map(children, (child, index) => (
          <RadixDialog.Close asChild key={index}>
            {child}
          </RadixDialog.Close>
        ))}
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
