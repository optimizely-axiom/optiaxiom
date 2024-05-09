import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.colors["bg.success"],
        color: theme.colors["text.success"],
        padding: theme.spacing.md,
      }}
    >
      Using inline styles
    </div>
  );
}
