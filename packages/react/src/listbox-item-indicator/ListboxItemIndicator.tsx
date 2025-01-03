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
>(({ active, children, className, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  if (!active) {
    return (
      <Box asChild className={className} h="0" w="xs" {...sprinkleProps}>
        <svg ref={ref} {...restProps} />
      </Box>
    );
  }

  return (
    // @ts-expect-error -- too complex
    <Box asChild className={className} ref={ref} {...props}>
      {children ?? <IconCheck />}
    </Box>
  );
});

ListboxItemIndicator.displayName = "@optiaxiom/react/ListboxItemIndicator";
