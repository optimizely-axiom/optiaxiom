import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type DialogBodyProps = ComponentPropsWithRef<typeof Box>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        flex="1"
        fontSize="md"
        overflow="auto"
        px="lg"
        py="md"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogBody";
