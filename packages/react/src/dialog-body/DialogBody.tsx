import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";

type DialogBodyProps = ComponentPropsWithRef<typeof Box>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        flex="1"
        fontSize="md"
        justifyContent="start"
        overflow="auto"
        px="24"
        py="16"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogBody";
