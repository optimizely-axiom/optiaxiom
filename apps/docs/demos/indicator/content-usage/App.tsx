import { IconBell } from "@optiaxiom/icons";
import { Button, Indicator } from "@optiaxiom/react";

export function App() {
  return (
    <Indicator content="4" intent="danger" variant="strong">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
