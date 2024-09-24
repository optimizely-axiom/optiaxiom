import { CommandList as CmdkCommandList } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./ComboboxList.css";

type ComboboxListProps = BoxProps<typeof CmdkCommandList>;

export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps>(
  ({ children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box asChild {...styles.list({}, className)} {...sprinkleProps}>
        <CmdkCommandList ref={ref} {...restProps}>
          {children}
        </CmdkCommandList>
      </Box>
    );
  },
);

ComboboxList.displayName = "@optiaxiom/react/ComboboxList";
