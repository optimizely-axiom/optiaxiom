import { Field, Group, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Field label="Email">
        <Input placeholder="name@example.com" type="email" />
      </Field>
      <Field label="Password">
        <Input placeholder="Enter password" type="password" />
      </Field>
      <Field label="Phone number">
        <Input placeholder="+1 (555) 000-0000" type="tel" />
      </Field>
      <Field label="Website">
        <Input placeholder="https://example.com" type="url" />
      </Field>
      <Field label="Number">
        <Input placeholder="0" type="number" />
      </Field>
    </Group>
  );
}
