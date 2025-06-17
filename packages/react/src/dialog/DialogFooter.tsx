import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Flex } from "../flex";
import { useDialogContext } from "./DialogContext";
import * as styles from "./DialogFooter.css";

export type DialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, outerRef) => {
    const { footerRef } = useDialogContext("@optiaxiom/react/DialogFooter");
    const ref = useComposedRefs(footerRef, outerRef);

    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        <ButtonProvider size="lg">{children}</ButtonProvider>
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
