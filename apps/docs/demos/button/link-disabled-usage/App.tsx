import { Button, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Tooltip content="Disabled button link demo">
      <Button asChild disabled onClick={(event) => event.preventDefault()}>
        <a href="./props">Some</a>
      </Button>
    </Tooltip>
  );
}
