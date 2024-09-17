import { ComboboxOptions } from "@headlessui/react";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AutocompleteOptionsProps = BoxProps<typeof ComboboxOptions>;

export const AutocompleteOptions = forwardRef<
  HTMLDivElement,
  AutocompleteOptionsProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Box asChild {...sprinkleProps}>
      <ComboboxOptions ref={ref} {...restProps}>
        {children}
      </ComboboxOptions>
    </Box>
  );
});

AutocompleteOptions.displayName = "@optiaxiom/react/AutocompleteOptions";
