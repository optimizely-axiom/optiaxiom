import { PopoverContent, PopoverPortal } from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";
import * as styles from "./SelectContent.css";

type SelectContentProps = BoxProps<typeof PopoverContent>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, ...props }, ref) => {
    const { downshift } = useSelectContext("SelectContent");

    return (
      <PopoverPortal forceMount>
        <Box
          asChild
          {...styles.content({ open: downshift.isOpen }, className)}
          {...props}
        >
          <PopoverContent align="center" ref={ref} sideOffset={5}>
            <Box asChild {...styles.wrapperList()}>
              <ul {...downshift.getMenuProps()}>
                {downshift.isOpen && children}
              </ul>
            </Box>
          </PopoverContent>
        </Box>
      </PopoverPortal>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
