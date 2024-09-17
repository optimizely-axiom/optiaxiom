import { ComboboxOption } from "@headlessui/react";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AutocompleteOptionProps = BoxProps<typeof ComboboxOption>;

export const AutocompleteOption = forwardRef<
  HTMLDivElement,
  AutocompleteOptionProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Box asChild {...sprinkleProps}>
      <ComboboxOption {...restProps} ref={ref}>
        {children}
      </ComboboxOption>
    </Box>
  );
});

AutocompleteOption.displayName = "@optiaxiom/react/AutocompleteOption";
