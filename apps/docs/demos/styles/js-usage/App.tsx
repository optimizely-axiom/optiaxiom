import { theme } from "@optiaxiom/react";

export function App() {
  return (
    <div
      style={{
        background: theme.colors["bg.success.subtle"],
        color: theme.colors["fg.success.strong"],
        padding: theme.spacing.md,
      }}
    >
      Using inline styles
    </div>
  );
}
