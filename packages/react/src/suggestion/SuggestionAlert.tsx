import { type ComponentPropsWithoutRef, useState } from "react";

import { Alert } from "../alert";
import { Button } from "../button";
import { Group } from "../group";
import { useSurface } from "../surface";
import { useSuggestions } from "../surface/internals";
import { Text } from "../text";

export type SuggestionAlertProps = ComponentPropsWithoutRef<typeof Alert>;

export function SuggestionAlert({ ...props }: SuggestionAlertProps) {
  const surface = useSurface();
  const hasPopover = surface?.suggestionPopover.registered;
  const messageSuggestions = useSuggestions("message");
  const valueSuggestions = useSuggestions("value");
  const [isExecuting, setIsExecuting] = useState(false);

  // Show message suggestions first, then value suggestions if no popover is handling them
  const messageSuggestion = messageSuggestions?.[0];
  const valueSuggestion = !hasPopover ? valueSuggestions?.[0] : undefined;
  const suggestion = messageSuggestion ?? valueSuggestion;

  if (!suggestion) {
    return null;
  }

  const text =
    suggestion.type === "message"
      ? suggestion.text
      : surface?.renderSuggestionValue
        ? surface.renderSuggestionValue(suggestion.value)
        : String(suggestion.value);

  const reason = suggestion.type === "value" ? suggestion.reason : undefined;

  return (
    <Alert
      intent="opal"
      onDismiss={() => surface?.reject(suggestion.id)}
      {...props}
    >
      <Text>{text}</Text>
      {reason && <Text color="fg.secondary">{reason}</Text>}
      <Group gap="4">
        <Button
          appearance="primary-opal"
          disabled={isExecuting}
          loading={isExecuting}
          onClick={async () => {
            if (suggestion.type === "message" && suggestion.tool) {
              setIsExecuting(true);
              try {
                await surface?.executeTool(
                  suggestion.tool.name,
                  suggestion.tool.parameters,
                );
              } finally {
                setIsExecuting(false);
              }
            }

            surface?.accept(suggestion.id);
          }}
          size="sm"
        >
          Accept
        </Button>
      </Group>
    </Alert>
  );
}

SuggestionAlert.displayName = "@optiaxiom/react/SuggestionAlert";
