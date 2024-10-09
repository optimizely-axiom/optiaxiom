import { forwardRef, type MouseEvent, useEffect, useRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { PopoverContent } from "../popover-content";
import { usePopoverContext } from "../popover-context";
import { Spinner } from "../spinner";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = BoxProps<
  typeof PopoverContent,
  {
    loading?: boolean;
  }
>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(({ children, className, loading, ...props }, ref) => {
  const { downshift } = useAutocompleteContext("AutocompleteContent");

  const { open } = usePopoverContext("AutocompleteContent");
  const isOpenRef = useRef(open);
  useEffect(() => {
    isOpenRef.current = open;
  });

  return (
    <PopoverContent
      align="center"
      /**
       * We use animations to show/hide the popup and so there is a small
       * duration when the menu is open but should not be interactive.
       *
       * So we capture mouse movements during this period and prevent
       * propagating them to downshift. Otherwise downshift will use these
       * mousemove events to change highlightedIndex.
       */
      onMouseMoveCapture={(event: MouseEvent) => {
        if (!isOpenRef.current) {
          event.stopPropagation();
        }
      }}
      onOpenAutoFocus={(event: Event) => event.preventDefault()}
      ref={ref}
      sideOffset={5}
      {...styles.content({}, className)}
      {...props}
    >
      <Box asChild {...styles.list()}>
        <ul {...downshift.getMenuProps({}, { suppressRefError: true })}>
          {loading ? (
            <Box asChild display="flex" justifyContent="center" p="md">
              <li>
                <Spinner />
              </li>
            </Box>
          ) : (
            children
          )}
        </ul>
      </Box>
    </PopoverContent>
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
