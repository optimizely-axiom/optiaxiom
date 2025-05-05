"use client";

import { DateInput } from "@optiaxiom/react";

export function App() {
  return <DateInput holiday={(day) => day.getDate() === 5} />;
}
