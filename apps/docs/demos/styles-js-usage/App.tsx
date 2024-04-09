import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.color["purple.200"],
        color: theme.color["purple.600"],
        padding: theme.space.md,
      }}
    >
      Using CSS variables inline
    </div>
  );
}
