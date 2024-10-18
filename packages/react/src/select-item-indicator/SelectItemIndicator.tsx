import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import { useSelectItemContext } from "../select-item-context";
import { extractSprinkles } from "../sprinkles";

type SelectItemIndicatorProps = BoxProps<typeof IconCheck>;

export const SelectItemIndicator = forwardRef<
  SVGSVGElement,
  SelectItemIndicatorProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { active } = useSelectItemContext("SelectItemIndicator");
  if (!active) {
    return <Box w="12" />;
  }

  return (
    <Box asChild {...sprinkleProps}>
      {children ?? <IconCheck ref={ref} {...restProps} />}
    </Box>
  );
});

SelectItemIndicator.displayName = "@optiaxiom/react/SelectItemIndicator";
