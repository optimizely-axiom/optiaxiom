import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import { TooltipContent } from "../tooltip-content";
import { TooltipRoot } from "../tooltip-root";
import { TooltipTrigger } from "../tooltip-trigger";

type TooltipProps = BoxProps<
  typeof TooltipContent,
  {
    /**
     * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
     */
    auto?: boolean;
    children: ReactNode;
    content?: ReactNode;
    defaultOpen?: boolean;
    delayDuration?: ComponentPropsWithRef<typeof TooltipRoot>["delayDuration"];
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }
>;

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  (
    {
      auto,
      children,
      content,
      defaultOpen,
      delayDuration,
      disabled,
      onOpenChange,
      open,
      ...props
    },
    ref,
  ) => {
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
        <TooltipTrigger asChild ref={ref}>
          {children}
        </TooltipTrigger>

        {!disabled && !empty && (
          <TooltipContent maxW="xs" {...props}>
            {content}
          </TooltipContent>
        )}
      </TooltipRoot>
    );
  },
);

Tooltip.displayName = "@optiaxiom/react/Tooltip";
