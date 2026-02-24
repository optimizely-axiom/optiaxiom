import { Group, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Switch description="Receive notifications for new messages and updates">
        Push notifications
      </Switch>
      <Switch description="Allow us to collect anonymous usage data">
        Analytics
      </Switch>
    </Group>
  );
}
