import { forwardRef } from "react";

import { useAutocompleteItemContext } from "../autocomplete-item-context";
import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";

type AutocompleteItemIndicatorProps = BoxProps<typeof IconCheck>;

export const AutocompleteItemIndicator = forwardRef<
  SVGSVGElement,
  AutocompleteItemIndicatorProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { active } = useAutocompleteItemContext("AutocompleteItemIndicator");
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
