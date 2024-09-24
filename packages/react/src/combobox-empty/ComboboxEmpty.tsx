import { CommandEmpty as CmdkCommandEmpty } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type ComboboxEmptyProps = BoxProps<typeof CmdkCommandEmpty>;

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...sprinkleProps}>
        <CmdkCommandEmpty ref={ref} {...restProps}>
          {children || "No results found"}
        </CmdkCommandEmpty>
      </Box>
    );
  },
);

ComboboxEmpty.displayName = "@optiaxiom/react/ComboboxEmpty";
