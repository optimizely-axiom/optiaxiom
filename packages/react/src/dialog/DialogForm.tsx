import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";

type DialogFormProps = BoxProps<"form">;

export const DialogForm = forwardRef<HTMLFormElement, DialogFormProps>(
  ({ children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box
        asChild
        className={className}
        display="flex"
        flexDirection="column"
        overflow="auto"
        {...boxProps}
      >
        <form ref={ref} {...restProps}>
          {children}
        </form>
      </Box>
    );
  },
);

DialogForm.displayName = "@optiaxiom/react/DialogForm";
