import { type ComponentPropsWithRef, type ReactNode } from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { TooltipContent } from "../tooltip-content";
import { TooltipRoot } from "../tooltip-root";
import { TooltipTrigger } from "../tooltip-trigger";

type TooltipProps = ExcludeProps<
  BoxProps<
    typeof TooltipContent,
    Pick<ComponentPropsWithRef<typeof TooltipRoot>, "delayDuration"> & {
      /**
       * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
       */
      auto?: boolean;
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

export function Tooltip({
  auto,
  children,
  content,
  defaultOpen,
  delayDuration,
  disabled,
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
      disableHoverableContent={disabled || empty}
      onOpenChange={onOpenChange}
      open={open}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      {!disabled && !empty && (
        <TooltipContent maxW="xs" {...props}>
          {content}
        </TooltipContent>
      )}
    </TooltipRoot>
  );
}

Tooltip.displayName = "@optiaxiom/react/Tooltip";
