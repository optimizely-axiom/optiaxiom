import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAlertContext } from "../alert-context";
import { Box } from "../box";

type AlertTitleProps = ComponentPropsWithRef<typeof Box>;

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useAlertContext("AlertTitle");

    return (
      <Box fontWeight="600" id={labelId} ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

AlertTitle.displayName = "@optiaxiom/react/AlertTitle";
