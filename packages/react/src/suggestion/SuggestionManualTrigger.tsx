import { forwardRef, useEffect, useState } from "react";

import type { PopoverTrigger } from "../popover";

import { Avatar } from "../avatar";
import { Button, type ButtonProps } from "../button";
import { useEvent } from "../hooks";
import { useSurface } from "../surface";
import { useSuggestions } from "../surface/internals";

export type SuggestionManualTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const SuggestionManualTrigger = forwardRef<
  HTMLButtonElement,
  SuggestionManualTriggerProps
>((props, ref) => {
  const surface = useSurface("property");

  const register = useEvent(surface?.suggestionPopover.register ?? (() => {}));
  useEffect(() => {
    return register();
  }, [register]);

  const [pending, setPending] = useState(false);
  const suggestions = useSuggestions("property", "value");
  const suggestion = suggestions?.[0];

  const acceptSuggestion = useEvent(() => {
    if (!suggestion) {
      return;
    }
    surface?.accept(suggestion.id);
    setPending(false);
  });
  useEffect(() => {
    acceptSuggestion();
  }, [suggestion?.id, acceptSuggestion]);

  if (!surface) {
    return null;
  }

  return (
    <Button
      appearance="subtle"
      aria-label="Opal suggestion"
      icon={<Avatar fallback="opal" size="2xs" />}
      loading={pending}
      onClick={() => {
        setPending(true);
        surface.track({ name: "requested", value: surface.value });
      }}
      ref={ref}
      size="sm"
      {...props}
      disabled={pending || props.disabled}
    />
  );
});

SuggestionManualTrigger.displayName =
  "@optiaxiom/react/SuggestionManualTrigger";
