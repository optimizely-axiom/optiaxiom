import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.color["bg.success"],
        color: theme.color["text.success"],
        padding: theme.spacing.md,
      }}
    >
      Using inline styles
    </div>
  );
}
