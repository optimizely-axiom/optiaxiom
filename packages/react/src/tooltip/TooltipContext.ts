"use client";

import type { TooltipController } from "@ui-sdk/react/tooltip";
import type { MutableRefObject, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export type TooltipContentHandlers = {
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (
    event: CustomEvent<{ originalEvent: PointerEvent }>,
  ) => void;
};

export const [TooltipProvider, useTooltipContext] = createContext<{
  /**
   * Whether the tooltip has something to show: content, and for `auto`, a
   * trigger whose text overflows.
   */
  canOpen: () => boolean;
  /**
   * Connects `controller` to the tooltip.
   */
  connect: () => void;
  /**
   * The mounted content's handlers, or `null` while no content is mounted.
   */
  contentRef: MutableRefObject<null | TooltipContentHandlers>;
  controller: TooltipController;
  disableHoverableContent: boolean;
  isOpen: () => boolean;
  setShown: (shown: boolean) => void;
  shown: boolean;
  triggerRef: RefObject<HTMLButtonElement>;
}>("@optiaxiom/react/Tooltip");

export const [TooltipDefaultsProvider, useTooltipDefaults] = createContext<{
  delayDuration: number;
  disableHoverableContent: boolean;
}>("@optiaxiom/react/TooltipDefaults", {
  delayDuration: 700,
  disableHoverableContent: true,
});
