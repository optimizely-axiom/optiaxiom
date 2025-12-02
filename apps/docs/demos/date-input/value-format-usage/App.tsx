"use client";

import { DateInput, Flex, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [dateValue, setDateValue] = useState("2025-01-22");
  const [datetimeValue, setDatetimeValue] = useState("2025-01-22T14:30");

  return (
    <Flex>
      <Flex>
        <DateInput onValueChange={setDateValue} type="date" value={dateValue} />
        <Text color="fg.secondary" fontSize="sm">
          Date format:{" "}
          <Text asChild fontWeight="600">
            <span>{dateValue || "YYYY-MM-DD"}</span>
          </Text>
        </Text>
      </Flex>

      <Flex>
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
      </Flex>
    </Flex>
  );
}
