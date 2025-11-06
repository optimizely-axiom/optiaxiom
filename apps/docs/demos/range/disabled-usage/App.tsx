"use client";

import { Range } from "@optiaxiom/react/unstable";

export function App({ disabled = true }: { disabled?: boolean }) {
  return <Range defaultValue={30} disabled={disabled} w="384" />;
}
