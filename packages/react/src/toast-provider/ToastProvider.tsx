import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Portal } from "@radix-ui/react-portal";
import * as RadixToast from "@radix-ui/react-toast";
import {
  type ComponentPropsWithoutRef,
  cloneElement,
  forwardRef,
  useRef,
  useSyncExternalStore,
} from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./ToastProvider.css";
import { type createToaster, toaster } from "./createToaster";
import { useOverflowAnchor } from "./useOverflowAnchor";

type ToastProps = BoxProps<
  typeof RadixToast.Viewport,
  {
    children?: never;
    container?: ComponentPropsWithoutRef<typeof Portal>["container"];
    /**
     * An instance of toaster returned from the `createToaster` method.
     */
    toaster?: ReturnType<typeof createToaster>;
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

export const ToastProvider = forwardRef<HTMLOListElement, ToastProps>(
  (
    {
      container,
      duration,
      label,
      position = "bottom-right",
      swipeDirection,
      swipeThreshold,
      toaster: toasterProp = toaster,
      ...props
    },
    outerRef,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const toasts = useSyncExternalStore(
      toasterProp.store.subscribe,
      toasterProp.store.getSnapshot,
      toasterProp.store.getServerSnapshot,
    );

    const innerRef = useRef<HTMLOListElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useOverflowAnchor(
      innerRef,
      position.startsWith("bottom") ? "top" : "bottom",
    );

    return (
      <RadixToast.ToastProvider
        duration={duration}
        label={label}
        swipeDirection={swipeDirection ?? mapPositionToSwipeDirection[position]}
        swipeThreshold={swipeThreshold}
      >
        {toasts.map(({ id, open, toast }) =>
          cloneElement(toast, {
            forceMount: true,
            key: id,
            onOpenChange: (open: boolean) => {
              toast.props.onOpenChange?.(open);
              toasterProp.remove(id);
            },
            open,
          }),
        )}

        <Portal container={container}>
          <Flex
            alignItems={
              position.endsWith("left")
                ? "start"
                : position.endsWith("right")
                  ? "end"
                  : "center"
            }
            asChild
            data-position={position}
            flexDirection={
              position.startsWith("bottom") ? "column-reverse" : "column"
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

ToastProvider.displayName = "@optiaxiom/react/ToastProvider";
