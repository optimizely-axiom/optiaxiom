import { Checkbox, Group, Separator } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Checkbox>Label</Checkbox>
      <Separator orientation="vertical" />
      <Checkbox />
    </Group>
  );
}
