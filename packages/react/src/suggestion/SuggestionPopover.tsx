import { forwardRef, useEffect } from "react";

import { Avatar } from "../avatar";
import { Button, type ButtonProps } from "../button";
import { Heading } from "../heading";
import { useEffectEvent } from "../hooks";
import { IconCheck } from "../icons/IconCheck";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";
import { useSurface } from "../surface";
import { useSuggestions } from "../surface/internals";
import { Text } from "../text";

export type SuggestionPopoverProps = ButtonProps<typeof PopoverTrigger>;

export const SuggestionPopover = forwardRef<
  HTMLButtonElement,
  SuggestionPopoverProps
>((props, ref) => {
  const surface = useSurface("property");

  const register = useEffectEvent(
    surface?.suggestionPopover.register ?? (() => {}),
  );
  useEffect(() => {
    return register();
  }, [register]);

  const suggestions = useSuggestions("property", "value");
  const suggestion = suggestions?.find((s) => s.value !== surface?.value);

  // Return null if no suggestions or current value matches suggestion
  if (!suggestion || !surface) {
    return null;
  }

  const text = surface.renderSuggestionValue
    ? surface.renderSuggestionValue(suggestion.value)
    : String(suggestion.value);

  return (
    <Popover>
      <PopoverTrigger
        appearance="subtle"
        aria-label="Opal suggestion"
        icon={<Avatar fallback="opal" size="2xs" />}
        ref={ref}
        size="sm"
        {...props}
      />
      <PopoverContent aria-label="Suggestion" fontSize="sm" gap="4" p="12">
        <Text>{text}</Text>
        {suggestion.reason && (
          <>
            <Separator my="8" />
            <Heading fontSize="sm" level="4">
              Why this was suggested
            </Heading>
            <Text color="fg.secondary">{suggestion.reason}</Text>
          </>
        )}
        <Separator my="8" />
        <Button
          icon={<IconCheck />}
          justifyContent="center"
          onClick={() => {
            surface.accept(suggestion.id);
          }}
          size="sm"
        >
          Accept
        </Button>
      </PopoverContent>
    </Popover>
  );
});

SuggestionPopover.displayName = "@optiaxiom/react/SuggestionPopover";
