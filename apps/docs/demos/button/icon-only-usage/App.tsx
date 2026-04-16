import { IconDelete, IconEdit } from "@optiaxiom/icons";
import { Button, Group, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Button appearance="subtle" aria-label="Edit item" icon={<IconEdit />} />
      <Tooltip content="Remove item">
        <Button
          appearance="subtle"
          aria-label="Remove item"
          icon={<IconDelete />}
        />
      </Tooltip>
    </Group>
  );
}
