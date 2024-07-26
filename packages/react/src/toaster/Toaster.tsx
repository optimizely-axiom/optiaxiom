import * as RadixToast from "@radix-ui/react-toast";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Toaster.css";

type ToastProps = BoxProps<
  typeof RadixToast.Viewport,
  {
    children?: ReactNode;
  } & ComponentPropsWithoutRef<typeof RadixToast.ToastProvider> &
    styles.ViewportVariants
>;

const mapPositionToSwipeDirection = {
  bottom: "down",
  "bottom-left": "left",
  "bottom-right": "right",
  top: "up",
  "top-left": "left",
  "top-right": "right",
} as const;

export const Toaster = forwardRef<HTMLOListElement, ToastProps>(
  (
    {
      children,
      duration,
      label,
      position = "bottom-right",
      swipeDirection,
      swipeThreshold,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <RadixToast.ToastProvider
        duration={duration}
        label={label}
        swipeDirection={swipeDirection ?? mapPositionToSwipeDirection[position]}
        swipeThreshold={swipeThreshold}
      >
        {children}

        <Box asChild {...styles.viewport({ position })} {...sprinkleProps}>
          <RadixToast.Viewport ref={ref} {...restProps} />
        </Box>
      </RadixToast.ToastProvider>
    );
  },
);

Toaster.displayName = "@optiaxiom/react/Toaster";
