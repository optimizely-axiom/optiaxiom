import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import * as styles from "./ListboxItemIndicator.css";

export type ListboxItemIndicatorProps = BoxProps<
  typeof IconCheck,
  {
    /**
     * Whether to display a tick to indicate if the item is active or not.
     */
    active?: boolean;
  }
>;

export const ListboxItemIndicator = forwardRef<
  SVGSVGElement,
  ListboxItemIndicatorProps
>(({ active, children, className, ...props }, ref) => {
  return (
    <Box
      asChild
      // @ts-expect-error -- too complex
      ref={ref}
      {...styles.indicator({ active }, className)}
      {...props}
    >
      {children ?? <IconCheck />}
    </Box>
  );
});

ListboxItemIndicator.displayName = "@optiaxiom/react/ListboxItemIndicator";
