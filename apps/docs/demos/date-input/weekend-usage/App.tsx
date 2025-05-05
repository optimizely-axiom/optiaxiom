"use client";

import { DateInput } from "@optiaxiom/react";

export function App() {
  return <DateInput weekend={{ dayOfWeek: [0, 6] }} />;
}
