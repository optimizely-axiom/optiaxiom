import {
  Field,
  Group,
  Select,
  SelectContent,
  SelectTrigger,
  Textarea,
} from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Field description="Share your thoughts with us." label="Message">
        <Textarea placeholder="Enter your message..." rows={3} />
      </Field>
      <Field label="Country" required>
        <Select
          options={[
            { label: "United States", value: "us" },
            { label: "United Kingdom", value: "uk" },
            { label: "Canada", value: "ca" },
          ]}
        >
          <SelectTrigger placeholder="Select a country" />
          <SelectContent />
        </Select>
      </Field>
    </Group>
  );
}
