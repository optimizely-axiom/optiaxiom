import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";

export type DetailsPanelBodyProps = ComponentPropsWithRef<typeof Box>;

/**
 * @group DetailsPanel
 */
export const DetailsPanelBody = forwardRef<
  HTMLDivElement,
  DetailsPanelBodyProps
>(({ children, ...props }, ref) => {
  return (
    <Flex flex="1" fontSize="md" px="16" ref={ref} {...props}>
      {children}
    </Flex>
  );
});

DetailsPanelBody.displayName = "@optiaxiom/react/DetailsPanelBody";
