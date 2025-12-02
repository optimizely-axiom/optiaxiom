"use client";

import { Field, Input } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");
  const maxLength = 50;

  return (
    <Field
      description={`${value.length}/${maxLength}`}
      label="Project description"
    >
      <Input
        maxLength={maxLength}
        onValueChange={setValue}
        placeholder="Enter description..."
        value={value}
      />
    </Field>
  );
}
