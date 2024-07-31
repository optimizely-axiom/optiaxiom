import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Portal } from "@radix-ui/react-portal";
import * as RadixToast from "@radix-ui/react-toast";
import { useAtomValue } from "jotai";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  useRef,
} from "react";

import type { createToaster } from "./createToaster";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Toaster.css";
import { useOverflowAnchor } from "./useOverflowAnchor";

type ToastProps = BoxProps<
  typeof RadixToast.Viewport,
  {
    children?: ReactNode;
    container?: ComponentPropsWithoutRef<typeof Portal>["container"];
    toaster: ReturnType<typeof createToaster>;
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
      container,
      duration,
      label,
      position = "bottom-right",
      swipeDirection,
      swipeThreshold,
      toaster,
      ...props
    },
    outerRef,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const toasts = useAtomValue(toaster.atom);

    const innerRef = useRef<HTMLOListElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useOverflowAnchor(
      innerRef,
      position.startsWith("bottom") ? "bottom" : "top",
    );

    return (
      <RadixToast.ToastProvider
        duration={duration}
        label={label}
        swipeDirection={swipeDirection ?? mapPositionToSwipeDirection[position]}
        swipeThreshold={swipeThreshold}
      >
        {toasts.map(({ id, toast }) =>
          cloneElement(toast, {
            forceMount: true,
            key: id,
            onOpenChange: () => setTimeout(() => toaster.remove(id), 200),
          }),
        )}

        <Portal container={container}>
          <Flex
            asChild
            data-position={position}
            flexDirection={
              position.startsWith("bottom") ? "column" : "column-reverse"
            }
            {...styles.viewport({ position })}
            {...sprinkleProps}
          >
            <RadixToast.Viewport ref={ref} {...restProps} />
          </Flex>
        </Portal>
      </RadixToast.ToastProvider>
    );
  },
);

Toaster.displayName = "@optiaxiom/react/Toaster";
