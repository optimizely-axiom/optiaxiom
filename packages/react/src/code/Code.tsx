import { Slot as RadixSlot } from "radix-ui";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Code.css";

const Slot = RadixSlot.createSlot("@optiaxiom/react/Code");

type CodeProps = BoxProps<"code">;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.code({}, className)} {...boxProps}>
        <Comp ref={ref} {...restProps}>
          {children}
        </Comp>
      </Box>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
