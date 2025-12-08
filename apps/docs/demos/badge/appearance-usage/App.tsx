import { Badge, Group } from "@optiaxiom/react";

const appearances = [
  "neutral",
  "information",
  "success",
  "warning",
  "danger",
  "primary",
] as const;

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Group gap="16">
        {appearances.map((intent) => (
          <Badge intent={intent} key={intent}>
            {intent}
          </Badge>
        ))}
      </Group>
      <Group gap="16">
        {appearances.map((intent) => (
          <Badge intent={intent} key={intent} variant="strong">
            {intent}
          </Badge>
        ))}
      </Group>
    </Group>
  );
}
