import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./TableHeader.css";

type TableHeaderProps = BoxProps<"thead">;

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className, ...props }, ref) => (
  <Box asChild {...styles.header({}, className)} {...props}>
    <thead ref={ref}> {children} </thead>
  </Box>
));
TableHeader.displayName = "@optiaxiom/react/TableHeader";
