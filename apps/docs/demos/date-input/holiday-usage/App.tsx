"use client";

import { DateInput } from "@optiaxiom/react/unstable";

export function App() {
  return <DateInput holiday={(day) => day.getDate() === 5} />;
}
