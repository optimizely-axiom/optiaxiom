import { CommandItem as CmdkCommandItem } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./CommandItem.css";

type CommandItemProps = BoxProps<typeof CmdkCommandItem> & styles.ItemVariants;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box
        asChild
        {...styles.item({ colorScheme: "neutral" })}
        {...sprinkleProps}
      >
        <CmdkCommandItem ref={ref} {...restProps}>
          {children}
        </CmdkCommandItem>
      </Box>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
