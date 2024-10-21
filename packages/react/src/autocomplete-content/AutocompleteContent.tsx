import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { PopoverContent } from "../popover-content";
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

  return (
    <PopoverContent
      align="center"
      minW="trigger"
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
