import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAlertContext } from "../alert-context";
import { Box } from "../box";
import { Flex } from "../flex";

type AlertDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useAlertContext("AlertDescription");

  return (
    <Flex gap="xs" id={descriptionId} ref={ref} {...props}>
      {children}
    </Flex>
  );
});

AlertDescription.displayName = "@optiaxiom/react/AlertDescription";
