import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Group } from "../group";

export type DetailsPanelBodyProps = ComponentPropsWithRef<typeof Box>;

/**
 * @group DetailsPanel
 */
export const DetailsPanelBody = forwardRef<
  HTMLDivElement,
  DetailsPanelBodyProps
>(({ children, ...props }, ref) => {
  return (
    <Group
      flex="1"
      flexDirection="column"
      fontSize="md"
      gap="16"
      px="16"
      ref={ref}
      {...props}
    >
      {children}
    </Group>
  );
});

DetailsPanelBody.displayName = "@optiaxiom/react/DetailsPanelBody";
