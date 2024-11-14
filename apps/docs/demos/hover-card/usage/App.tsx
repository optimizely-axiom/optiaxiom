import {
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Text,
} from "@optiaxiom/react";

export function App() {
  return (
    <Text>
      <HoverCard>
        <HoverCardTrigger>Open hover card</HoverCardTrigger>
        <HoverCardContent>
          <Heading level="6">Hover card content</Heading>
          <Text>This is the hover card content</Text>
        </HoverCardContent>
      </HoverCard>
    </Text>
  );
}
