import { Tooltip } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Tooltip content="Disabled pill demo">
      <Pill disabled>Disabled</Pill>
    </Tooltip>
  );
}
