import { Field, Group, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Field label="Price">
        <Input addonBefore="$" placeholder="0.00" type="number" />
      </Field>
      <Field label="Discount">
        <Input addonAfter="%" placeholder="0" type="number" />
      </Field>
      <Field label="Weight">
        <Input addonAfter="kg" placeholder="0" type="number" />
      </Field>
      <Field label="Website">
        <Input addonBefore="https://" placeholder="example.com" type="url" />
      </Field>
      <Field label="Username">
        <Input addonBefore="@" placeholder="username" />
      </Field>
    </Group>
  );
}
