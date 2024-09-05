import { CommandItem as CmdkCommandItem } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./CommandItem.css";

type CommandItemProps = BoxProps<
  typeof CmdkCommandItem,
  {
    value: string;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, className, onSelect, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.item({}, className)} {...sprinkleProps}>
        <CmdkCommandItem onSelect={onSelect} ref={ref} {...restProps}>
          <Flex flexDirection="row" justifyContent="space-between" w="full">
            {children}
          </Flex>
        </CmdkCommandItem>
      </Box>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
