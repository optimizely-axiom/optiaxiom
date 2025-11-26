import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Flex } from "../flex";
import * as styles from "./DetailsPanelFooter.css";

export type DetailsPanelFooterProps = ComponentPropsWithRef<typeof Flex>;

/**
 * @group DetailsPanel
 */
export const DetailsPanelFooter = forwardRef<
  HTMLDivElement,
  DetailsPanelFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <ButtonProvider size="lg">
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        {children}
      </Flex>
    </ButtonProvider>
  );
});

DetailsPanelFooter.displayName = "@optiaxiom/react/DetailsPanelFooter";
