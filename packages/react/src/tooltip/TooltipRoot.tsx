import {
  createTooltipController,
  Tooltip as UiTooltip,
} from "@ui-sdk/react/tooltip";
import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  type TooltipContentHandlers,
  TooltipProvider,
  useTooltipDefaults,
} from "./TooltipContext";

export type TooltipRootProps = {
  /**
   * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
   */
  auto?: boolean;
  children?: ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   * @defaultValue false
   */
  defaultOpen?: boolean;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The open state in controlled mode.
   */
  open?: boolean;
};

export function TooltipRoot({
  auto,
  children,
  defaultOpen,
  delayDuration,
  disableHoverableContent,
  onOpenChange,
  open,
}: TooltipRootProps) {
  const defaults = useTooltipDefaults("@optiaxiom/react/TooltipRoot");
  const contentRef = useRef<null | TooltipContentHandlers>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [controller] = useState(() => createTooltipController());
  /**
   * Connected on the first hover or open, which wake the tooltip anyway: one
   * with a controller from the start never sleeps, and every one would build
   * its popup on mount.
   */
  const [connected, setConnected] = useState(false);
  const openRef = useRef(open ?? defaultOpen ?? false);
  /**
   * Whether the content renders its children. It stays in the page while
   * closed, so they render only from when the pointer or focus reaches the
   * trigger until it has animated out: the content has its full size when it
   * opens, and its text isn't in the page twice the rest of the time.
   */
  const [shown, setShown] = useState(open ?? defaultOpen ?? false);
  const canOpen = () =>
    !!contentRef.current &&
    !(auto && triggerRef.current && !hasTruncatedContent(triggerRef.current));

  /**
   * Radix's tooltip protocol, kept for anything that dispatches it, like
   * SelectTrigger opening its menu from the keyboard, and for tooltips from
   * another copy of this package: one tooltip opening closes the others.
   */
  const openingRef = useRef(false);
  useEffect(() => {
    const close = () => {
      if (!openingRef.current && (open ?? openRef.current)) {
        controller.close({ reason: "imperative" });
      }
    };
    document.addEventListener(tooltipOpenEvent, close);
    return () => document.removeEventListener(tooltipOpenEvent, close);
  }, [controller, open]);

  return (
    <UiTooltip
      controller={connected || open ? controller : undefined}
      defaultOpen={defaultOpen}
      delay={delayDuration ?? defaults.delayDuration}
      onOpenChange={(open, details) => {
        const content = contentRef.current;
        if (open) {
          /**
           * Cancelling keeps an open that shows nothing from counting as one,
           * so the next tooltip still waits for its delay.
           */
          if (!canOpen()) {
            details.cancel();
            return;
          }
        } else if (
          details.reason === "escape-key" &&
          details.event?.type === "keydown"
        ) {
          const event = details.event as KeyboardEvent;
          const prevented = event.defaultPrevented;
          content?.onEscapeKeyDown?.(event);
          if (!prevented && event.defaultPrevented) {
            details.cancel();
            return;
          }
        } else if (details.reason === "outside-press" && details.event) {
          const event = new CustomEvent("pointerdownoutside", {
            cancelable: true,
            detail: { originalEvent: details.event as PointerEvent },
          });
          content?.onPointerDownOutside?.(event);
          if (event.defaultPrevented) {
            details.cancel();
            return;
          }
        }

        if (open) {
          openingRef.current = true;
          document.dispatchEvent(new CustomEvent(tooltipOpenEvent));
          openingRef.current = false;
          setConnected(true);
        }
        openRef.current = open;
        onOpenChange?.(open);
      }}
      onOpenChangeComplete={setShown}
      open={open}
      /**
       * Not the default, which names a trigger with no name of its own:
       * `aria-labelledby` isn't allowed on a trigger without a role, like
       * Range's thumb.
       */
      type="description"
    >
      <TooltipProvider
        canOpen={canOpen}
        connect={() => setConnected(true)}
        contentRef={contentRef}
        controller={controller}
        disableHoverableContent={
          disableHoverableContent ?? defaults.disableHoverableContent
        }
        isOpen={() => open ?? openRef.current}
        setShown={setShown}
        shown={shown}
        triggerRef={triggerRef}
      >
        {children}
      </TooltipProvider>
    </UiTooltip>
  );
}

TooltipRoot.displayName = "@optiaxiom/react/TooltipRoot";

const tooltipOpenEvent = "tooltip.open";

const hasTruncatedContent = (element: HTMLElement) => {
  let truncated = false;

  const elements: Element[] = [element];
  while (!truncated && elements.length) {
    const element = elements.shift();
    if (!(element instanceof HTMLElement)) {
      continue;
    }
    const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } = element;

    if (offsetWidth < scrollWidth || offsetHeight < scrollHeight) {
      truncated = true;
      break;
    }

    elements.push(...element.children);
  }

  return truncated;
};
