import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { CommandSubContextProvider } from "../command-sub-context";
import { extractSprinkles } from "../sprinkles";

type CommandSubProps = BoxProps<
  "li",
  {
    item: unknown;
  }
>;

export const CommandSub = forwardRef<HTMLLIElement, CommandSubProps>(
  ({ children, item, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <CommandSubContextProvider item={item}>
        <Box asChild {...sprinkleProps}>
          <li ref={ref} role="group" {...restProps}>
            {children}
          </li>
        </Box>
      </CommandSubContextProvider>
    );
  },
);

CommandSub.displayName = "@optiaxiom/react/CommandSub";
