import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";

export type AsideFormProps = BoxProps<"form">;

export const AsideForm = forwardRef<HTMLFormElement, AsideFormProps>(
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

AsideForm.displayName = "@optiaxiom/react/AsideForm";
