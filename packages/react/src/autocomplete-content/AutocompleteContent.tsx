import { PopoverContent, PopoverPortal } from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = BoxProps<typeof PopoverContent>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(({ children, className, ...props }, ref) => {
  const { downshift } = useAutocompleteContext("AutocompleteContent");

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
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
