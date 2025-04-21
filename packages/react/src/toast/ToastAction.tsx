import * as RadixToast from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { Separator } from "../separator";

type ToastProps = ButtonProps<typeof RadixToast.Action>;

export const ToastAction = forwardRef<HTMLButtonElement, ToastProps>(
  (
    { altText, appearance = "inverse", children, size = "sm", ...props },
    ref,
  ) => {
    return (
      <>
        <Separator alignSelf="center" h="sm" ml="12" orientation="vertical" />

        <Button appearance={appearance} asChild size={size} {...props}>
          <RadixToast.Action altText={altText} ref={ref}>
            {children}
          </RadixToast.Action>
        </Button>
      </>
    );
  },
);

ToastAction.displayName = "@optiaxiom/react/ToastAction";
