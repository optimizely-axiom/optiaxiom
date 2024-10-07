import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteItemContext } from "../autocomplete-item-context";
import { Box } from "../box";
import { IconCheck } from "../icons/IconCheck";

type AutocompleteItemIndicatorProps = ComponentPropsWithRef<typeof Box>;

export const AutocompleteItemIndicator = forwardRef<
  HTMLDivElement,
  AutocompleteItemIndicatorProps
>(({ ...props }, ref) => {
  const { active } = useAutocompleteItemContext("AutocompleteItemIndicator");

  return (
    <Box asChild ref={ref} {...props}>
      {active && <IconCheck />}
    </Box>
  );
});

AutocompleteItemIndicator.displayName =
  "@optiaxiom/react/AutocompleteItemIndicator";
