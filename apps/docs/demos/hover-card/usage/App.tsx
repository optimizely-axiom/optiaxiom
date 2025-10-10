import { Text } from "@optiaxiom/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Text fontSize="md">
      Demo of{" "}
      <HoverCard>
        <HoverCardTrigger
          bg="bg.secondary"
          color="fg.default"
          cursor="pointer"
          fontSize="sm"
          px="12"
          py="4"
          rounded="full"
        >
          hover trigger
        </HoverCardTrigger>
        <HoverCardContent aria-label="Card label">
          <Text>This is the hover card content</Text>
        </HoverCardContent>
      </HoverCard>{" "}
      inside a block of text.
    </Text>
  );
}
