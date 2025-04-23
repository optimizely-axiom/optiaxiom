import { Toast as RadixToast } from "radix-ui";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";

type ToastProps = TextProps<typeof RadixToast.Title>;

export const ToastTitle = forwardRef<HTMLDivElement, ToastProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text asChild flex="1" {...props}>
        <RadixToast.Title ref={ref}>{children}</RadixToast.Title>
      </Text>
    );
  },
);

ToastTitle.displayName = "@optiaxiom/react/ToastTitle";
