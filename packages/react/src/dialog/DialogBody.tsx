import { type ReactNode, forwardRef } from "react";

import { Box } from "../box";

type DialogBodyProps = { children: ReactNode };

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box {...props} maxH="sm" mr="-24" overflow="auto" pr="24" ref={ref}>
        {children}
      </Box>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogScrollableContent";
