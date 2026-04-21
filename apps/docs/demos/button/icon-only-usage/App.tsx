import { IconPen, IconTrashCan } from "@optiaxiom/icons";
import { Button, Group, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Button appearance="subtle" aria-label="Edit item" icon={<IconPen />} />
      <Tooltip content="Remove item">
        <Button
          appearance="subtle"
          aria-label="Remove item"
          icon={<IconTrashCan />}
        />
      </Tooltip>
    </Group>
  );
}
