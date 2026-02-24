"use client";

import { Field, Group, Input, Radio, RadioGroup } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [method, setMethod] = useState("standard");

  return (
    <Group flexDirection="column" gap="16" w="224">
      <Field label="Shipping method">
        <RadioGroup
          name="pattern-conditional-usage"
          onValueChange={setMethod}
          value={method}
        >
          <Radio value="standard">Standard</Radio>
          <Radio value="express">Express</Radio>
          <Radio value="pickup">Pickup</Radio>
        </RadioGroup>
      </Field>

      {method === "express" && (
        <Field label="Phone number for delivery updates">
          <Input placeholder="Enter phone number" type="tel" />
        </Field>
      )}

      {method === "pickup" && (
        <Field label="Store location">
          <RadioGroup name="pattern-conditional-store">
            <Radio value="downtown">Downtown</Radio>
            <Radio value="midtown">Midtown</Radio>
            <Radio value="uptown">Uptown</Radio>
          </RadioGroup>
        </Field>
      )}
    </Group>
  );
}
