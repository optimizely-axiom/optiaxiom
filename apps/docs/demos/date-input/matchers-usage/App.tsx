import { DateInput, Field, Flex } from "@optiaxiom/react";

export function App() {
  const publicHolidays = [
    new Date(2025, 0, 1), // New Year's Day
    new Date(2025, 6, 4), // Independence Day
    new Date(2025, 11, 25), // Christmas
  ];

  return (
    <Flex>
      <Field label="Specific dates as holidays">
        <DateInput holiday={publicHolidays} />
      </Field>
      <Field label="Date range as holidays">
        <DateInput
          holiday={{ from: new Date(2025, 11, 24), to: new Date(2025, 11, 31) }}
        />
      </Field>
      <Field label="Multiple matchers (weekends + date range)">
        <DateInput
          holiday={[
            { dayOfWeek: [0, 6] },
            { from: new Date(2025, 11, 24), to: new Date(2025, 11, 31) },
          ]}
        />
      </Field>
    </Flex>
  );
}
