import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Group } from "../group";
import * as styles from "./DetailsPanelFooter.css";

export type DetailsPanelFooterProps = ComponentPropsWithRef<typeof Group>;

/**
 * @group DetailsPanel
 */
export const DetailsPanelFooter = forwardRef<
  HTMLDivElement,
  DetailsPanelFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <ButtonProvider size="lg">
      <Group ref={ref} {...styles.footer({}, className)} {...props}>
        {children}
      </Group>
    </ButtonProvider>
  );
});

DetailsPanelFooter.displayName = "@optiaxiom/react/DetailsPanelFooter";
