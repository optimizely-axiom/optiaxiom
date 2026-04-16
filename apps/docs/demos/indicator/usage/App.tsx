import { IconNotifications } from "@optiaxiom/icons";
import { Button, Indicator } from "@optiaxiom/react";

export function App() {
  return (
    <Indicator intent="danger" variant="strong">
      <Button aria-label="Notifications" icon={<IconNotifications />} />
    </Indicator>
  );
}
