import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App() {
  return (
    <Indicator colorScheme="danger" content="4" variant="solid">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
