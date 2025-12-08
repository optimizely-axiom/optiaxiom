"use client";

import { DateInput, Group, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [dateValue, setDateValue] = useState("2025-01-22");
  const [datetimeValue, setDatetimeValue] = useState("2025-01-22T14:30");

  return (
    <Group flexDirection="column" gap="16">
      <Group flexDirection="column" gap="16">
        <DateInput onValueChange={setDateValue} type="date" value={dateValue} />
        <Text color="fg.secondary" fontSize="sm">
          Date format:{" "}
          <Text asChild fontWeight="600">
            <span>{dateValue || "YYYY-MM-DD"}</span>
          </Text>
        </Text>
      </Group>
      <Group flexDirection="column" gap="16">
        <DateInput
          onValueChange={setDatetimeValue}
          type="datetime-local"
          value={datetimeValue}
        />
        <Text color="fg.secondary" fontSize="sm">
          DateTime format:{" "}
          <Text asChild fontWeight="600">
            <span>{datetimeValue || "YYYY-MM-DDTHH:MM"}</span>
          </Text>
        </Text>
      </Group>
    </Group>
  );
}
