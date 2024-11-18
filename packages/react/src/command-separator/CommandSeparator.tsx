import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Separator } from "../separator";

type CommandSeparatorProps = BoxProps<typeof Separator>;

export const CommandSeparator = forwardRef<
  HTMLHRElement,
  CommandSeparatorProps
>((props, ref) => (
  <Separator
    bg="border.secondary"
    flex="none"
    mx="8"
    my="4"
    ref={ref}
    {...props}
  />
));

CommandSeparator.displayName = "@optiaxiom/react/CommandSeparator";
