import { theme } from "@optiaxiom/globals";

export function App() {
  return (
    <div
      style={{
        background: theme.colors["bg.success.subtle"],
        color: theme.colors["fg.success.strong"],
        padding: theme.spacing["16"],
      }}
    >
      Using inline styles
    </div>
  );
}
