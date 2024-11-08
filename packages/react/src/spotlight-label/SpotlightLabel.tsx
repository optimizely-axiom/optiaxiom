import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type SpotlightLabelProps = BoxProps<"li">;

export const SpotlightLabel = forwardRef<HTMLLIElement, SpotlightLabelProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        color="fg.default"
        fontSize="lg"
        fontWeight="600"
        pb="sm"
        pt="md"
        px="lg"
        {...sprinkleProps}
      >
        <li ref={ref} {...restProps}>
          {children}
        </li>
      </Box>
    );
  },
);

SpotlightLabel.displayName = "@optiaxiom/react/SpotlightLabel";
