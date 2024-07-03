import { type ReactNode, forwardRef } from "react";

import { Box } from "../box";

type DialogScrollableContentProps = { children: ReactNode };

export const DialogScrollableContent = forwardRef<
  HTMLDivElement,
  DialogScrollableContentProps
>(({ children, ...props }, ref) => {
  return (
    <Box {...props} maxH="sm" mr="-24" overflow="auto" pr="24" ref={ref}>
      {children}
    </Box>
  );
});

DialogScrollableContent.displayName =
  "@optiaxiom/react/DialogScrollableContent";
