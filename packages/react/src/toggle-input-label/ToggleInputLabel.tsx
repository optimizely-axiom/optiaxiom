import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useToggleInputContext } from "../toggle-input-context";

type ToggleInputLabelProps = BoxProps<"div">;

export const ToggleInputLabel = forwardRef<
  HTMLDivElement,
  ToggleInputLabelProps
>(({ children, onMouseDown, ...props }, ref) => {
  const { labelId } = useToggleInputContext("ToggleInputLabel");

  return (
    <Box
      id={labelId}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      }}
      ref={ref}
      {...props}
    >
      {children}
    </Box>
  );
});

ToggleInputLabel.displayName = "@optiaxiom/react/ToggleInputLabel";
