import { Group, Separator, Switch } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Switch>Label</Switch>
      <Separator orientation="vertical" />
      <Switch />
    </Group>
  );
}
