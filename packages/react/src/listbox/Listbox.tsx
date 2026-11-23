import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { TransitionGlobalConfig } from "../transition";
import * as styles from "./Listbox.css";

export type ListboxProps = BoxProps<
  "div",
  {
    /**
     * Whether to fade the edges that have more items scrolled past them.
     *
     * The fade is a mask, so it also clips a shadow on the same element: put
     * surfaces like `Paper` on a wrapper.
     */
    mask?: boolean;
  }
>;

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  ({ children, className, mask, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        {...styles.listbox(
          {
            // Tools that freeze animations by seeking them (Chromatic) cannot
            // seek scroll-driven ones.
            mask:
              mask && TransitionGlobalConfig.skipAnimations ? "static" : mask,
          },
          className,
        )}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Listbox.displayName = "@optiaxiom/react/Listbox";
