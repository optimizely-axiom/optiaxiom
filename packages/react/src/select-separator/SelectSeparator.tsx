import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Separator } from "../separator";
import { extractSprinkles } from "../sprinkles";

type SelectSeparatorProps = BoxProps<typeof Separator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild ref={ref} {...sprinkleProps}>
        <Separator
          bg="border.secondary"
          flex="none"
          mx="8"
          my="4"
          {...restProps}
        >
          {children}
        </Separator>
      </Box>
    );
  },
);

SelectSeparator.displayName = "@optiaxiom/react/SelectSeparator";
