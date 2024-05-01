import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type PaperProps = ComponentPropsWithRef<typeof Box>;

export const Paper = forwardRef<HTMLParagraphElement, PaperProps>(
  (props, ref) => {
    return (
      <Box
        background="surface"
        borderRadius="sm"
        boxShadow="sm"
        ref={ref}
        {...props}
      />
    );
  },
);

Paper.displayName = "@optiaxiom/react/Paper";
