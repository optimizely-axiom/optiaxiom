import { forwardRef } from "react";

import { useAutocompleteListContext } from "../autocomplete-list-context";
import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";

type AutocompleteItemIndicatorProps = BoxProps<typeof IconCheck>;

export const AutocompleteItemIndicator = forwardRef<
  SVGSVGElement,
  AutocompleteItemIndicatorProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { active } = useAutocompleteListContext("AutocompleteItemIndicator");
  if (!active) {
    return <Box w="12" />;
  }

  return (
    <Box asChild {...sprinkleProps}>
      {children ?? <IconCheck ref={ref} {...restProps} />}
    </Box>
  );
});

AutocompleteItemIndicator.displayName =
  "@optiaxiom/react/AutocompleteItemIndicator";
