import type { ReactNode } from "react";

import { TooltipDefaultsProvider } from "./TooltipContext";

export type TooltipProviderProps = {
  children: ReactNode;
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened.
   * @defaultValue 700
   */
  delayDuration?: number;
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   */
  disableHoverableContent?: boolean;
  /**
   * Has no effect: once a tooltip has opened, others open without a delay
   * until 400ms after it closes.
   *
   * @deprecated
   */
  skipDelayDuration?: number;
};

/**
 * Provider component for tooltips. This is included in AxiomProvider by default - you only need to use this component directly for advanced customization.
 *
 * @group Tooltip
 */
export function TooltipProvider({
  children,
  delayDuration = 700,
  disableHoverableContent = true,
}: TooltipProviderProps) {
  return (
    <TooltipDefaultsProvider
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipDefaultsProvider>
  );
}

TooltipProvider.displayName = "@optiaxiom/react/TooltipProvider";
