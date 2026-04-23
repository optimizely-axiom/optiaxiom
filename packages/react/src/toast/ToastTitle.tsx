import * as RadixToast from "@radix-ui/react-toast";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./ToastTitle.css";

export type ToastTitleProps = TextProps<typeof RadixToast.Title>;

/**
 * @group Toast
 * @extends Text
 */
export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Text asChild lineClamp="2" {...styles.title({}, className)} {...props}>
        <RadixToast.Title ref={ref}>{children}</RadixToast.Title>
      </Text>
    );
  },
);

ToastTitle.displayName = "@optiaxiom/react/ToastTitle";
