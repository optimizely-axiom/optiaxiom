import { Badge, Flex } from "@optiaxiom/react";

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
    <Flex>
      <Flex flexDirection="row">
        {appearances.map((intent) => (
          <Badge intent={intent} key={intent}>
            {intent}
          </Badge>
        ))}
      </Flex>
      <Flex flexDirection="row">
        {appearances.map((intent) => (
          <Badge intent={intent} key={intent} variant="strong">
            {intent}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
}
