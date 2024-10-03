import { Button, Flex, Tooltip } from "@optiaxiom/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row">
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
    </Flex>
  );
}
