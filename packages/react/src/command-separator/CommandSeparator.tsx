import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Separator } from "../separator";

type CommandSeparatorProps = BoxProps<typeof Separator>;

export const CommandSeparator = forwardRef<
  HTMLLIElement,
  CommandSeparatorProps
>((props, ref) => (
  <Box asChild>
    <li ref={ref}>
      <Separator asChild bg="border.secondary" mx="-4" my="2" {...props} />
    </li>
  </Box>
));

CommandSeparator.displayName = "@optiaxiom/react/CommandSeparator";
