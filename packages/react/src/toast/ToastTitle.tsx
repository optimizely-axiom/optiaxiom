import * as RadixToast from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";

export type ToastTitleProps = TextProps<typeof RadixToast.Title>;

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text asChild flex="1" {...props}>
        <RadixToast.Title ref={ref}>{children}</RadixToast.Title>
      </Text>
    );
  },
);

ToastTitle.displayName = "@optiaxiom/react/ToastTitle";
