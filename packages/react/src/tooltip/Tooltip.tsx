import { type ComponentPropsWithRef, type ReactNode } from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { TooltipContent } from "./TooltipContent";
import { TooltipRoot } from "./TooltipRoot";
import { TooltipTrigger } from "./TooltipTrigger";

export type TooltipProps = ExcludeProps<
  BoxProps<
    typeof TooltipContent,
    Pick<
      ComponentPropsWithRef<typeof TooltipRoot>,
      "auto" | "delayDuration"
    > & {
      children: ReactNode;
      /**
       * The tooltip content.
       */
      content?: ReactNode;
      /**
       * The initial open state in uncontrolled mode.
       */
      defaultOpen?: boolean;
      /**
       * Whether to show or hide tooltip even if there's content.
       */
      disabled?: boolean;
      /**
       * Handler that is called when the open state changes.
       */
      onOpenChange?: (open: boolean) => void;
      /**
       * The open state in controlled mode.
       */
      open?: boolean;
    }
  >,
  "asChild"
>;

/**
 * Popup with brief information shown when user interacts with an element using
 * keyboard focus or mouse hover.
 *
 * Keep content to a short plain-text label of a few words. For longer, rich or
 * interactive help use Popover opened from a labelled button instead: a
 * tooltip closes when the pointer moves onto it and doesn't open on tap.
 *
 * To show a keyboard shortcut, add a `Kbd` to the content:
 * `<Kbd modifiers="mod">K</Kbd>` shows ⌘ on macOS and Ctrl elsewhere.
 *
 * The child must be focusable or contain a focusable element, otherwise
 * keyboard users can't open the tooltip.
 *
 * @category overlay
 * @since 0.1.0
 */
export function Tooltip({
  auto,
  children,
  content,
  defaultOpen,
  delayDuration,
  disabled,
  disableHoverableContent,
  onOpenChange,
  open,
  ...props
}: TooltipProps) {
  const empty = !content && typeof content !== "number";

  return (
    <TooltipRoot
      auto={auto}
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
      onOpenChange={onOpenChange}
      open={open}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      {!disabled && !empty && (
        <TooltipContent
          disableHoverableContent={disableHoverableContent}
          {...props}
        >
          {content}
        </TooltipContent>
      )}
    </TooltipRoot>
  );
}

Tooltip.displayName = "@optiaxiom/react/Tooltip";
