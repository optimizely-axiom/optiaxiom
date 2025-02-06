import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App() {
  return (
    <Indicator content="4" intent="danger" variant="strong">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
