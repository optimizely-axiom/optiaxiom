import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Listbox.css";

export type ListboxProps = BoxProps<"div", styles.ListboxVariants>;

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  ({ children, className, mask, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.listbox({ mask }, className)} {...props}>
        {children}
      </Box>
    );
  },
);

Listbox.displayName = "@optiaxiom/react/Listbox";
