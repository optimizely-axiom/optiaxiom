import { forwardRef } from "react";

import { type ButtonProps } from "../button";
import { type PopoverTrigger } from "../popover";
import { useSurface } from "../surface";
import { SuggestionAutoPopover } from "./SuggestionAutoPopover";
import { SuggestionManualTrigger } from "./SuggestionManualTrigger";

export type SuggestionPopoverProps = ButtonProps<typeof PopoverTrigger>;

/**
 * @experimental
 */
export const SuggestionPopover = forwardRef<
  HTMLButtonElement,
  SuggestionPopoverProps
>((props, ref) => {
  const surface = useSurface("property");
  return surface?.manualSuggestion ? (
    <SuggestionManualTrigger ref={ref} {...props} />
  ) : (
    <SuggestionAutoPopover ref={ref} {...props} />
  );
});

SuggestionPopover.displayName = "@optiaxiom/react/SuggestionPopover";
