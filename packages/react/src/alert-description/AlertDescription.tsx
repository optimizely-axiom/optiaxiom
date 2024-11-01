import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAlertContext } from "../alert-context";
import { Box } from "../box";

type AlertDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useAlertContext("AlertDescription");

  return (
    <Box id={descriptionId} ref={ref} {...props}>
      {children}
    </Box>
  );
});

AlertDescription.displayName = "@optiaxiom/react/AlertDescription";
