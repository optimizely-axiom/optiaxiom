import { ToastContextProvider } from "@optiaxiom/globals";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Portal } from "@radix-ui/react-portal";
import * as RadixToast from "@radix-ui/react-toast";
import {
  cloneElement,
  type ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  useRef,
} from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim/index.js";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { ToastAction } from "../toast-action";
import { ToastTitle } from "../toast-title";
import { Toast } from "../toast/Toast";
import { type createToaster, toaster } from "./toaster";
import * as styles from "./ToastProvider.css";
import { useOverflowAnchor } from "./useOverflowAnchor";

type ToastProps = BoxProps<
  typeof RadixToast.Viewport,
  ComponentPropsWithoutRef<typeof RadixToast.ToastProvider> &
    styles.ViewportVariants & {
      children?: never;
      container?: ComponentPropsWithoutRef<typeof Portal>["container"];
      /**
       * An instance of toaster returned from the `createToaster` method.
       */
      toaster?: ReturnType<typeof createToaster>;
    }
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
    const toasts = useSyncExternalStore(...toasterProp.store);

    const innerRef = useRef<HTMLOListElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useOverflowAnchor(
      innerRef,
      position.startsWith("bottom") ? "top" : "bottom",
    );

    if (!toasts.length) {
      return null;
    }

    return (
      <RadixToast.ToastProvider
        duration={duration}
        label={label}
        swipeDirection={swipeDirection ?? mapPositionToSwipeDirection[position]}
        swipeThreshold={swipeThreshold}
      >
        {toasts.map(({ id, open, toast }) => (
          <ToastContextProvider
            key={id}
            onOpenChange={() => toasterProp.remove(id)}
            open={open}
          >
            {cloneElement(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/microsoft/TypeScript/issues/53178
              isValidElement<any>(toast) ? (
                toast
              ) : (
                <Toast intent={toast.type} key={id}>
                  <ToastTitle>{toast.title}</ToastTitle>
                  {toast.action && (
                    <ToastAction
                      altText={toast.action.altText}
                      onClick={toast.action.onClick}
                    >
                      {toast.action.label}
                    </ToastAction>
                  )}
                </Toast>
              ),
              {
                forceMount: true,
                key: id,
                onOpenChange: () => toasterProp.remove(id),
                open,
              },
            )}
          </ToastContextProvider>
        ))}

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
