import { IconTrashCan } from "@optiaxiom/icons";
import { Button } from "@optiaxiom/react";

export function App() {
  return (
    <Button appearance="danger-outline" icon={<IconTrashCan />}>
      Delete
    </Button>
  );
}
