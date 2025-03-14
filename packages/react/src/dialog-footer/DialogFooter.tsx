import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button-context";
import { Flex } from "../flex";
import * as styles from "./DialogFooter.css";

type DialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        <ButtonProvider size="lg">{children}</ButtonProvider>
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
