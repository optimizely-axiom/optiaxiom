import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxListContext } from "../combobox-list-context";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";

type ComboboxItemIndicatorProps = BoxProps<typeof IconCheck>;

export const ComboboxItemIndicator = forwardRef<
  SVGSVGElement,
  ComboboxItemIndicatorProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { active } = useComboboxListContext("ComboboxItemIndicator");
  if (!active) {
    return <Box w="12" />;
  }

  return (
    <Box asChild {...sprinkleProps}>
      {children ?? <IconCheck ref={ref} {...restProps} />}
    </Box>
  );
});

ComboboxItemIndicator.displayName = "@optiaxiom/react/ComboboxItemIndicator";
