import { useId } from "@radix-ui/react-id";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./DetailsPanel.css";
import { DetailsPanelProvider } from "./DetailsPanelContext";

const Slot = createSlot("@optiaxiom/react/DetailsPanel");

export type DetailsPanelProps = BoxProps<"aside">;

/**
 * Panel for showing additional content on the right side of the page.
 *
 * @group DetailsPanel
 * @since 1.6.0
 * @experimental
 * @category container
 */
export const DetailsPanel = forwardRef<HTMLElement, DetailsPanelProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "aside";

    const labelId = useId();
    const descriptionId = useId();

    return (
      <DetailsPanelProvider descriptionId={descriptionId} labelId={labelId}>
        <Box
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          asChild
          tabIndex={0}
          {...styles.root({}, className)}
          {...props}
        >
          <Comp ref={ref}>{children}</Comp>
        </Box>
      </DetailsPanelProvider>
    );
  },
);

DetailsPanel.displayName = "@optiaxiom/react/DetailsPanel";
