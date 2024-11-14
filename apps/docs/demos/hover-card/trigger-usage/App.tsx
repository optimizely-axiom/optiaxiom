import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Text,
} from "@optiaxiom/react";
import { IconMailQuestion } from "@tabler/icons-react";

export function App() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          appearance="subtle"
          aria-label="Information hover"
          icon={<IconMailQuestion />}
        />
      </HoverCardTrigger>

      <HoverCardContent>
        <Text>Notification example content</Text>
      </HoverCardContent>
    </HoverCard>
  );
}
