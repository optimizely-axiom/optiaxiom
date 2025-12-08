import { Checkbox, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Checkbox defaultChecked disabled>
        Label
      </Checkbox>
      <Checkbox disabled>Label</Checkbox>
    </Group>
  );
}
