import { ToastProviderProvider } from "@optiaxiom/globals";
import { type createToaster, toaster } from "@optiaxiom/globals";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixToast from "@radix-ui/react-toast";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { type BoxProps, extractBoxProps } from "../box";
import { Group } from "../group";
import { Portal } from "../portal";
import { usePortalContext } from "../portal/internals";
import { Toast } from "./Toast";
import { ToastAction } from "./ToastAction";
import * as styles from "./ToastProvider.css";
import { ToastTitle } from "./ToastTitle";
import { useOverflowAnchor } from "./useOverflowAnchor";

export type ToastProviderProps = BoxProps<
  typeof RadixToast.Viewport,
  Omit<
    ComponentPropsWithoutRef<typeof RadixToast.ToastProvider>,
    "announcerContainer"
  > &
    Pick<ComponentPropsWithoutRef<typeof Portal>, "container"> &
    styles.ViewportVariants & {
      children?: never;
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

/**
 * Provider component for toast notifications. This is included in AxiomProvider
 * by default - you only need to use this component directly for advanced
 * customization. Use `toaster.create()` to display toast messages.
 *
 * A toast briefly confirms something that already happened, like "Changes
 * saved". It closes on its own, so nothing can depend on the user reading it or
 * clicking its action, and whatever the action does must be reachable
 * elsewhere too. Toasts with an action stay open 1.5× the provider's
 * `duration`. Don't use a toast for:
 *
 * - Undo windows that hold a change back: apply the change right away and make
 *   the action restore it, without a confirmation dialog beforehand.
 * - Progress on running work: show it on the control that started it, with
 *   `Button` `loading` or an inline `Spinner`.
 * - Long or persistent messages: use `Banner` or `Alert`.
 *
 * @category provider
 * @category feedback
 * @category overlay
 * @since 0.1.0
 */
export const ToastProvider = forwardRef<HTMLOListElement, ToastProviderProps>(
  (
    {
      className,
      container,
      duration = 5000,
      label,
      position = "top-right",
      swipeDirection,
      swipeThreshold,
      toaster: toasterProp = toaster,
      ...props
    },
    outerRef,
  ) => {
    const { boxProps, restProps } = extractBoxProps(props);
    const toasts = useSyncExternalStore(...toasterProp.store);
    const portal = usePortalContext("@optiaxiom/react/ToastProvider");

    const innerRef = useRef<HTMLOListElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useOverflowAnchor(
      innerRef,
      position.startsWith("bottom") ? "top" : "bottom",
    );

    if (!toasts.length) {
      return null;
    }

    let exitingToastOffsets = 0;

    return (
      <RadixToast.ToastProvider
        announcerContainer={(container ?? portal.container) || undefined}
        duration={duration}
        label={label}
        swipeDirection={swipeDirection ?? mapPositionToSwipeDirection[position]}
        swipeThreshold={swipeThreshold}
      >
        {toasts.map(({ id, open, ref, toast }) => (
          <ToastProviderProvider
            key={id}
            offset={
              (exitingToastOffsets +=
                !open && ref.current
                  ? ref.current.offsetHeight + parseInt(styles.gap)
                  : 0)
            }
            onOpenChange={() => toasterProp.remove(id)}
            open={open}
            toastRef={ref}
          >
            <Toast
              // Keyboard and screen reader users need longer to reach the
              // action: the polite announcement queues behind other speech,
              // then F8 and Tab move focus to the button.
              duration={toast.action ? duration * 1.5 : undefined}
              intent={toast.intent || toast.type}
              key={id}
            >
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.action && (
                <ToastAction altText={toast.action} onClick={toast.onAction}>
                  {toast.action}
                </ToastAction>
              )}
            </Toast>
          </ToastProviderProvider>
        ))}
        <Portal asChild {...(container && { container })}>
          <Group
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
            {...styles.viewport({ position }, className)}
            {...boxProps}
          >
            <RadixToast.Viewport ref={ref} {...restProps} />
          </Group>
        </Portal>
      </RadixToast.ToastProvider>
    );
  },
);

ToastProvider.displayName = "@optiaxiom/react/ToastProvider";
