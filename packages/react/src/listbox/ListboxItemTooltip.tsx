import { type ReactNode, useEffect, useState } from "react";

import { TooltipContent, TooltipRoot, TooltipTrigger } from "../tooltip";

export type ListboxItemTooltipProps = {
  children: ReactNode;
  /**
   * The tooltip content, usually the item's disabled reason.
   */
  content?: ReactNode;
  /**
   * Whether the item is highlighted. Focus stays on the input or trigger, so
   * the tooltip has to be opened for it.
   */
  highlighted: boolean;
};

export function ListboxItemTooltip({
  children,
  content,
  highlighted,
}: ListboxItemTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (!highlighted) {
      setDismissed(false);
    }
  }, [highlighted]);

  return (
    <TooltipRoot
      onOpenChange={(open) => {
        setHovered(open);
        if (open) {
          setDismissed(false);
        }
      }}
      open={Boolean(content) && !dismissed && (hovered || highlighted)}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      {content && (
        <TooltipContent
          /**
           * The tooltip is the top layer, so it takes Escape first; it has to
           * close itself even while the item stays highlighted.
           */
          onEscapeKeyDown={() => {
            setDismissed(true);
          }}
          /**
           * The tooltip covers the neighbouring item, so it gets out of the way
           * once the pointer moves over it. Not `onPointerEnter`: that also
           * fires when the tooltip opens under a resting pointer.
           */
          onPointerMove={() => {
            setDismissed(true);
            setHovered(false);
          }}
        >
          {content}
        </TooltipContent>
      )}
    </TooltipRoot>
  );
}

ListboxItemTooltip.displayName = "@optiaxiom/react/ListboxItemTooltip";
