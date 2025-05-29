import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeader.css";

export type TableHeaderProps = BoxProps<
  "thead",
  NonNullable<styles.HeaderVariants>
>;

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className, pinned, ...props }, ref) => (
  <Box asChild {...styles.header({ pinned }, className)} {...props}>
    <thead ref={ref}>{children}</thead>
  </Box>
));

TableHeader.displayName = "@optiaxiom/react/TableHeader";
