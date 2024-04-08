import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.colors["purple.200"],
        color: theme.colors["purple.600"],
        padding: theme.space.md,
      }}
    >
      Using CSS variables inline
    </div>
  );
}
