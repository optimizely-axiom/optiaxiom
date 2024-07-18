import { Button, Link, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Tooltip content="Disabled button link demo">
      <Button asChild disabled>
        <Link href="./props">Disabled Link</Link>
      </Button>
    </Tooltip>
  );
}
