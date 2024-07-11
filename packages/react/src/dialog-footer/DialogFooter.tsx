// import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./DialogFooter.css";

type FooterProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    children: ReactNode;
  }
>;

export const DialogFooter = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer()} {...props}>
        {children}
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
