import { Portal } from "@radix-ui/react-portal";
import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { Spinner } from "../spinner";
import { AutocompleteContentImpl } from "./AutocompleteContentImpl";

type AutocompleteContentProps = BoxProps<
  typeof AutocompleteContentImpl,
  {
    loading?: boolean;
  }
>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(({ children, loading, ...props }, ref) => {
  const { isOpen } = useAutocompleteContext("AutocompleteContent");

  return (
    isOpen && (
      <Portal asChild>
        <MenuListbox asChild minW="trigger" provider="popper" {...props}>
          <AutocompleteContentImpl ref={ref}>
            {loading ? (
              <Box display="flex" justifyContent="center" p="md">
                <Spinner />
              </Box>
            ) : (
              children
            )}
          </AutocompleteContentImpl>
        </MenuListbox>
      </Portal>
    )
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
