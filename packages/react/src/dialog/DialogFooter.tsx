// import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

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
        alignItems="center"
        flexDirection="row"
        gap="sm"
        justifyContent="end"
        pt="20"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
