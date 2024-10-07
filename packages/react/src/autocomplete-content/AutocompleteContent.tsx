import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { PopoverContent } from "../popover-content";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = BoxProps<typeof PopoverContent>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(({ children, className, ...props }, ref) => {
  const { downshift } = useAutocompleteContext("AutocompleteContent");

  return (
    <PopoverContent
      align="center"
      onOpenAutoFocus={(event: Event) => event.preventDefault()}
      ref={ref}
      sideOffset={5}
      {...styles.content({}, className)}
      {...props}
    >
      <Box asChild {...styles.list()}>
        <ul {...downshift.getMenuProps({}, { suppressRefError: true })}>
          {children}
        </ul>
      </Box>
    </PopoverContent>
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
