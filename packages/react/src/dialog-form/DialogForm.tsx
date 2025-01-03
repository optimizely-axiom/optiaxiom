import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type DialogFormProps = BoxProps<"form">;

export const DialogForm = forwardRef<HTMLFormElement, DialogFormProps>(
  ({ children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        className={className}
        display="flex"
        flexDirection="column"
        overflow="auto"
        {...sprinkleProps}
      >
        <form ref={ref} {...restProps}>
          {children}
        </form>
      </Box>
    );
  },
);

DialogForm.displayName = "@optiaxiom/react/DialogForm";
