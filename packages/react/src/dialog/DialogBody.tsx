import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";

type DialogBodyProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  { children: ReactNode }
>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        {...props}
        fontSize="md"
        maxH="xs"
        overflow="auto"
        px="24"
        py="16"
        ref={ref}
      >
        {children}
      </Box>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogScrollableContent";
