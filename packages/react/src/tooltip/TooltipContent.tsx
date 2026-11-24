import {
  TooltipArrow as UiTooltipArrow,
  TooltipContent as UiTooltipContent,
} from "@ui-sdk/react/tooltip";
import clsx from "clsx";
import { forwardRef, useEffect } from "react";

import type { ExcludeProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Portal } from "../portal";
import { Text } from "../text";
import { TransitionGlobalConfig } from "../transition";
import * as styles from "./TooltipContent.css";
import {
  type TooltipContentHandlers,
  useTooltipContext,
} from "./TooltipContext";

export type TooltipContentProps = ExcludeProps<
  BoxProps<
    "div",
    styles.ContentVariants & {
      /**
       * The preferred alignment against the trigger. May change when collisions occur.
       */
      align?: "center" | "end" | "start";
      /**
       * A more descriptive label for accessibility purpose
       */
      "aria-label"?: string;
      /**
       * Event handler called when the escape key is down.
       * Can be prevented.
       */
      onEscapeKeyDown?: TooltipContentHandlers["onEscapeKeyDown"];
      /**
       * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`.
       * Can be prevented.
       */
      onPointerDownOutside?: TooltipContentHandlers["onPointerDownOutside"];
      /**
       * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
       */
      side?: "bottom" | "left" | "right" | "top";
    }
  >,
  /**
   * The content is UI SDK's render element, with no child of its own.
   */
  "asChild"
>;

/**
 * @group TooltipRoot
 */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      align = "center",
      children,
      className,
      disableHoverableContent,
      onEscapeKeyDown,
      onPointerDownOutside,
      side = "top",
      ...props
    },
    ref,
  ) => {
    const context = useTooltipContext("@optiaxiom/react/TooltipContent");
    const { contentRef, shown } = context;
    /**
     * Content the pointer can't hover never takes the pointer, not even while
     * it slides in over the edge of its trigger.
     */
    const hoverDisabled =
      disableHoverableContent ?? context.disableHoverableContent;
    useEffect(() => {
      contentRef.current = { onEscapeKeyDown, onPointerDownOutside };
    });
    useEffect(
      () => () => {
        contentRef.current = null;
      },
      [contentRef],
    );

    return (
      <Portal asChild>
        <UiTooltipContent
          align={align}
          arrowPadding={6}
          render={
            <Box
              {...styles.content(
                { disableHoverableContent: hoverDisabled },
                clsx(
                  !TransitionGlobalConfig.skipAnimations &&
                    styles.transition().className,
                  className,
                ),
              )}
              {...props}
              ref={ref}
            />
          }
          side={side}
          sideOffset={4}
        >
          {(state) =>
            /**
             * Children only while shown, so the text of a closed tooltip
             * isn't in the page twice, like a truncated label's.
             */
            (state.open || shown) && (
              <>
                <Text asChild fontSize="sm">
                  <div>{children}</div>
                </Text>

                <UiTooltipArrow render={<div {...styles.arrow()} />} />
              </>
            )
          }
        </UiTooltipContent>
      </Portal>
    );
  },
);

TooltipContent.displayName = "@optiaxiom/react/TooltipContent";
