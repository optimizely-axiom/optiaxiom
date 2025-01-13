import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { IconCheck } from "../icons/IconCheck";

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
  const { boxProps, restProps } = extractBoxProps(props);

  if (!active) {
    return (
      <Box asChild className={className} h="0" w="xs" {...boxProps}>
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
