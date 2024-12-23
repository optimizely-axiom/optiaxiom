import { Portal } from "@radix-ui/react-portal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { MenuListbox } from "../menu-listbox";
import { ModalLayer } from "../modal-layer";
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
          <ModalLayer>
            <MenuListbox asChild minW="trigger" provider="popper" {...props}>
              <AutocompleteContentImpl ref={ref}>
                {loading ? (
                  <Box display="flex" justifyContent="center" p="16">
                    <Spinner />
                  </Box>
                ) : (
                  children
                )}
              </AutocompleteContentImpl>
            </MenuListbox>
          </ModalLayer>
        </Portal>
      </>
    )
  );
});

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
