import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Code.css";

type CodeProps = BoxProps<"code">;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.code({}, className)} {...sprinkleProps}>
        <Comp ref={ref} {...restProps}>
          {children}
        </Comp>
      </Box>
    );
  },
);

Code.displayName = "@optiaxiom/react/Code";
