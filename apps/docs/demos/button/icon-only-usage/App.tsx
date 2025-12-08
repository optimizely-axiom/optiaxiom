import { Button, Group, Tooltip } from "@optiaxiom/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <Group gap="16">
      <Button
        appearance="subtle"
        aria-label="Edit item"
        icon={<IconPencil />}
      />
      <Tooltip content="Remove item">
        <Button
          appearance="subtle"
          aria-label="Remove item"
          icon={<IconTrash />}
        />
      </Tooltip>
    </Group>
  );
}
