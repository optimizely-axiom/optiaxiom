import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { useCardContext } from "../card-context";
import * as styles from "./CardOverflow.css";

type CardOverflowProps = ComponentPropsWithRef<typeof Box>;

export const CardOverflow = forwardRef<HTMLDivElement, CardOverflowProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation } = useCardContext("CardOverflow");

    return (
      <Box
        ref={ref}
        {...styles.cardOverflow({ orientation }, className)}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

CardOverflow.displayName = "@optiaxiom/react/CardOverflow";
