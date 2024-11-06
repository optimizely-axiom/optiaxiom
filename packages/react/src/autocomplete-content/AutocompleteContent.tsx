import { PopperContent } from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { ListboxBase } from "../listbox-base";
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
    const { isOpen } = useAutocompleteContext("AutocompleteContent");

    return (
      <ListboxBase minW="trigger" open={isOpen} provider="popper">
        <Box asChild ref={ref} {...styles.content({}, className)} {...props}>
          <PopperContent align={align} sideOffset={sideOffset}>
            {loading ? (
              <Box display="flex" justifyContent="center" p="md">
                <Spinner />
              </Box>
            ) : (
              children
            )}
          </PopperContent>
        </Box>
      </ListboxBase>
    );
  },
);

AutocompleteContent.displayName = "@optiaxiom/react/AutocompleteContent";
