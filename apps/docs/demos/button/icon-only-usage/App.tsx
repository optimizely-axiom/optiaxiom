import { Button, Flex, Tooltip } from "@optiaxiom/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Button
        appearance="secondary"
        aria-label="Edit item"
        icon={<IconPencil />}
      />

      <Tooltip content="Remove item">
        <Button appearance="secondary" icon={<IconTrash />} />
      </Tooltip>
    </Flex>
  );
}
