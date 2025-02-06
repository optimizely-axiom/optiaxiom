import { Button, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

export function App() {
  return (
    <Indicator intent="danger" variant="strong">
      <Button aria-label="Notifications" icon={<IconBell />} />
    </Indicator>
  );
}
