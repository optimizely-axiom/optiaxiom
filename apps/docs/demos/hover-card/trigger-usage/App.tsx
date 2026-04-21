import { IconEnvelope } from "@optiaxiom/icons";
import { Button, Text } from "@optiaxiom/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optiaxiom/react/unstable";

export function App() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          appearance="subtle"
          aria-label="Information hover"
          icon={<IconEnvelope />}
        />
      </HoverCardTrigger>

      <HoverCardContent>
        <Text>Notification example content</Text>
      </HoverCardContent>
    </HoverCard>
  );
}
