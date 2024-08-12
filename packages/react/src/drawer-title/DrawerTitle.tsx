import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { DialogTitle } from "../dialog-title";

type TitleProps = ComponentPropsWithRef<typeof DialogTitle>;

export const DrawerTitle = forwardRef<HTMLDivElement, TitleProps>(
  ({ ...props }, ref) => {
    return (
      <Box>
        <DialogTitle ref={ref} {...props} />
      </Box>
    );
  },
);

DrawerTitle.displayName = "@optiaxiom/react/DrawerTitle";
