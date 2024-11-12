import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App() {
  return (
    <Indicator content="4" intent="danger" variant="solid">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
