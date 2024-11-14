import {
  Flex,
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Switch,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [keepOpen, setKeepOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Flex flexDirection="row">
      <Switch onCheckedChange={setKeepOpen}>Keep popover open</Switch>

      <Text>
        <HoverCard
          onOpenChange={(flag) => setOpen(flag || keepOpen)}
          open={open}
        >
          <HoverCardTrigger>Open hover card</HoverCardTrigger>
          <HoverCardContent>
            <Heading level="6">Hover card content</Heading>
            <Text>This is the hover card content</Text>
          </HoverCardContent>
        </HoverCard>
      </Text>
    </Flex>
  );
}
