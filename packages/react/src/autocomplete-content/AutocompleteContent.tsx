import { Portal } from "@radix-ui/react-portal";
import { Slot } from "@radix-ui/react-slot";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";
import { RemoveScroll } from "react-remove-scroll";

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
  const { isOpen, items } = useAutocompleteContext("AutocompleteContent");

  return (
    isOpen && (
      <>
        <Portal>
          <VisuallyHidden>
            <Box role="status">
              {loading
                ? "Loading"
                : `${items.length} option${items.length === 1 ? "" : "s"} available`}
            </Box>
          </VisuallyHidden>
        </Portal>

        <Portal asChild>
          <RemoveScroll allowPinchZoom as={Slot}>
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
          </RemoveScroll>
        </Portal>
      </>
    )
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
