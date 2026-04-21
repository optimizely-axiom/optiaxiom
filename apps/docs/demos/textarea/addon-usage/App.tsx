import {
  IconArrowUp,
  IconAt,
  IconCommentPlus,
  IconFileImage,
} from "@optiaxiom/icons";
import { Button, Group, Textarea, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Textarea
      addonAfter={
        <Group borderT="1" gap="4" p="4">
          <Tooltip content="Add emoji">
            <Button appearance="subtle" icon={<IconCommentPlus />} size="sm" />
          </Tooltip>
          <Tooltip content="Add mention">
            <Button appearance="subtle" icon={<IconAt />} size="sm" />
          </Tooltip>
          <Tooltip content="Upload images">
            <Button appearance="subtle" icon={<IconFileImage />} size="sm" />
          </Tooltip>

          <Tooltip content="Submit">
            <Button
              appearance="primary"
              icon={<IconArrowUp />}
              ml="auto"
              size="sm"
            />
          </Tooltip>
        </Group>
      }
      placeholder="Add a comment"
      w="224"
    />
  );
}
