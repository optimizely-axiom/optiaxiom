import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";

type ListboxItemIndicatorProps = BoxProps<
  typeof IconCheck,
  {
    active?: boolean;
  }
>;

export const ListboxItemIndicator = forwardRef<
  SVGSVGElement,
  ListboxItemIndicatorProps
>(({ active, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  if (!active) {
    return (
      <Box asChild h="0" w="xs" {...sprinkleProps}>
        <svg ref={ref} {...restProps} />
      </Box>
    );
  }

  return (
    <Box asChild {...sprinkleProps}>
      {children ?? <IconCheck ref={ref} {...restProps} />}
    </Box>
  );
});

ListboxItemIndicator.displayName = "@optiaxiom/react/ListboxItemIndicator";
