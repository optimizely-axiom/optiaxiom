import { DateInput, Field, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Field label="Default time at 2:30 PM">
        <DateInput placeholder="14:30" type="datetime-local" />
      </Field>
      <Field label="Default calendar to January 2025">
        <DateInput placeholder="2025-01-01" type="date" />
      </Field>
    </Group>
  );
}
