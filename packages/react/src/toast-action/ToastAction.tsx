import * as RadixToast from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { Separator } from "../separator";

type ToastProps = ButtonProps<typeof RadixToast.Action>;

export const ToastAction = forwardRef<HTMLButtonElement, ToastProps>(
  ({ altText, children, ...props }, ref) => {
    return (
      <>
        <Separator
          alignSelf="center"
          bg="border.active.hovered"
          h="sm"
          ml="sm"
          orientation="vertical"
        />

        <Button appearance="inverse" asChild size="sm" {...props}>
          <RadixToast.Action altText={altText} ref={ref}>
            {children}
          </RadixToast.Action>
        </Button>
      </>
    );
  },
);

ToastAction.displayName = "@optiaxiom/react/ToastAction";
