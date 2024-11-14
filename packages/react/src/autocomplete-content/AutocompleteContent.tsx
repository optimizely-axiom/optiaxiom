import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { ListboxBase } from "../listbox-base";
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
    <ListboxBase minW="trigger" open={isOpen} provider="popper">
      <AutocompleteContentImpl ref={ref} {...props}>
        {loading ? (
          <Box display="flex" justifyContent="center" p="md">
            <Spinner />
          </Box>
        ) : (
          children
        )}
      </AutocompleteContentImpl>
    </ListboxBase>
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
