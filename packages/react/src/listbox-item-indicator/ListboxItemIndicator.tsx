import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import * as styles from "./ListboxItemIndicator.css";

type ListboxItemIndicatorProps = BoxProps<
  typeof IconCheck,
  {
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
