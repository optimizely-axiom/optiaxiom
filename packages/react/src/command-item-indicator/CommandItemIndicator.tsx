import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandItemContext } from "../command-item-context";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";

type CommandItemIndicatorProps = BoxProps<typeof IconCheck>;

export const CommandItemIndicator = forwardRef<
  SVGSVGElement,
  CommandItemIndicatorProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { active } = useCommandItemContext("CommandItemIndicator");
  if (!active) {
    return <Box w="12" />;
  }

  return (
    <Box asChild {...sprinkleProps}>
      {children ?? <IconCheck ref={ref} {...restProps} />}
    </Box>
  );
});

CommandItemIndicator.displayName = "@optiaxiom/react/CommandItemIndicator";
