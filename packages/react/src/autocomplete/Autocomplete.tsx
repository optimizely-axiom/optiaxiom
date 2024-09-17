import { Combobox } from "@headlessui/react";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AutocompleteProps = BoxProps<typeof Combobox>;

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild ref={ref} {...sprinkleProps}>
        <Combobox {...restProps}>{children}</Combobox>
      </Box>
    );
  },
);

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
