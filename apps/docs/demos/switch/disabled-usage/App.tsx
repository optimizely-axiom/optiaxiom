import { Group, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Switch defaultChecked disabled>
        Label
      </Switch>
      <Switch disabled>Label</Switch>
    </Group>
  );
}
