import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { TooltipTrigger as UiTooltipTrigger } from "@ui-sdk/react/tooltip";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { FilteredSlot } from "../filtered-slot";
import { useTooltipContext } from "./TooltipContext";

export type TooltipTriggerProps = ComponentPropsWithoutRef<"button"> & {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read the {@link https://optimizely-axiom.github.io/optiaxiom/components/#composition Composition guide} for more details.
   */
  asChild?: boolean;
};

/**
 * @group TooltipRoot
 */
export const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(
  (
    {
      asChild,
      children,
      onBlur,
      onFocus,
      onPointerEnter,
      onPointerLeave,
      type,
      ...props
    },
    outerRef,
  ) => {
    const {
      canOpen,
      connect,
      controller,
      disableHoverableContent,
      isOpen,
      setShown,
      triggerRef,
    } = useTooltipContext("@optiaxiom/react/TooltipTrigger");
    const ref = useComposedRefs(triggerRef, outerRef);

    return (
      <UiTooltipTrigger
        {...props}
        onBlur={(event) => {
          onBlur?.(event);
          if (!isOpen()) {
            setShown(false);
          }
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setShown(canOpen());
        }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          setShown(canOpen());
          if (disableHoverableContent) {
            connect();
          }
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          /**
           * An open tooltip keeps its children until it has animated out.
           */
          if (!isOpen()) {
            setShown(false);
          }
          /**
           * Closes at once, even on the way to the content, which would
           * otherwise keep the tooltip open.
           */
          if (disableHoverableContent && event.pointerType !== "touch") {
            controller.close({
              event: event.nativeEvent,
              reason: "trigger-hover",
            });
          }
        }}
        render={
          /**
           * Not `type`: the trigger can be any element, and `type="button"`
           * turns an `input` into a button.
           */
          <FilteredSlot exclude="type" ref={ref}>
            {asChild ? children : <Button type={type}>{children}</Button>}
          </FilteredSlot>
        }
      />
    );
  },
);

TooltipTrigger.displayName = "@optiaxiom/react/TooltipTrigger";
