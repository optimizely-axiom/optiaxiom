"use client";

import { Button, Field, Group, Radio, RadioGroup } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return (
    <Group flexDirection="column" gap="16">
      <Field error={error || undefined} label="Preferred contact method">
        <RadioGroup
          name="error-usage"
          onValueChange={(val) => {
            setValue(val);
            setError("");
          }}
          value={value}
        >
          <Radio value="email">Email</Radio>
          <Radio value="phone">Phone</Radio>
          <Radio value="mail">Mail</Radio>
        </RadioGroup>
      </Field>
      <Button
        alignSelf="start"
        onClick={() => {
          if (!value) {
            setError("Please select a contact method");
          }
        }}
      >
        Submit
      </Button>
    </Group>
  );
}
