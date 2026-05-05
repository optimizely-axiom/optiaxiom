import { forwardRef, useEffect, useState } from "react";

import type { PopoverTrigger } from "../popover";

import { Avatar } from "../avatar";
import { Button, type ButtonProps } from "../button";
import { useEffectEvent } from "../hooks";
import { useSurface } from "../surface";
import { useSuggestions } from "../surface/internals";

export type SuggestionManualTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const SuggestionManualTrigger = forwardRef<
  HTMLButtonElement,
  SuggestionManualTriggerProps
>((props, ref) => {
  const surface = useSurface("property");

  const register = useEffectEvent(
    surface?.suggestionPopover.register ?? (() => {}),
  );
  useEffect(() => {
    return register();
  }, []);

  const [pending, setPending] = useState(false);
  const suggestions = useSuggestions("property", "value");
  const suggestion = suggestions?.find((s) => s.value !== surface?.value);

  const acceptSuggestion = useEffectEvent(() => {
    if (!suggestion) {
      return;
    }
    surface?.accept(suggestion.id);
    setPending(false);
  });
  useEffect(() => {
    acceptSuggestion();
  }, [suggestion?.id]);

  if (!surface) {
    return null;
  }

  return (
    <Button
      appearance="subtle"
      aria-label="Opal suggestion"
      disabled={pending}
      icon={
        <Avatar
          animation={pending ? "pulse" : undefined}
          fallback="opal"
          size="2xs"
        />
      }
      onClick={() => {
        setPending(true);
        surface.track({ name: "requested", value: surface.value });
      }}
      ref={ref}
      size="sm"
      {...props}
    />
  );
});

SuggestionManualTrigger.displayName =
  "@optiaxiom/react/SuggestionManualTrigger";
