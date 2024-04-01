import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.colors["aqua.50"],
        padding: theme.spacing.md,
      }}
    >
      Using CSS variables inline
    </div>
  );
}
