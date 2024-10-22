import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { MenuContentBase } from "../menu-content-base";
import { Spinner } from "../spinner";
import * as styles from "./AutocompleteContent.css";

type AutocompleteContentProps = BoxProps<
  typeof PopperContent,
  {
    loading?: boolean;
  }
>;

export const AutocompleteContent = forwardRef<
  HTMLDivElement,
  AutocompleteContentProps
>(
  (
    {
      align = "center",
      children,
      className,
      loading,
      sideOffset = 5,
      ...props
    },
    ref,
  ) => {
    const { downshift, isOpen } = useAutocompleteContext("AutocompleteContent");

    return (
      <MenuContentBase minW="trigger" open={isOpen} provider="popper">
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <PopperContent align={align} asChild sideOffset={sideOffset}>
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
          </PopperContent>
        </Box>
      </MenuContentBase>
    );
  },
);

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
