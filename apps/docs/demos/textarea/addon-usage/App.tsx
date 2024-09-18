import { Button, Flex, Textarea, Tooltip } from "@optiaxiom/react";
import {
  IconArrowUp,
  IconAt,
  IconMoodSmile,
  IconPhoto,
} from "@tabler/icons-react";

export function App() {
  return (
    <Textarea
      addonAfter={
        <Flex borderT="1" flexDirection="row" gap="4" p="4">
          <Tooltip content="Add emoji">
            <Button appearance="secondary" icon={<IconMoodSmile />} size="sm" />
          </Tooltip>
          <Tooltip content="Add mention">
            <Button appearance="secondary" icon={<IconAt />} size="sm" />
          </Tooltip>
          <Tooltip content="Upload images">
            <Button appearance="secondary" icon={<IconPhoto />} size="sm" />
          </Tooltip>

          <Tooltip content="Submit">
            <Button
              appearance="primary"
              icon={<IconArrowUp />}
              ml="auto"
              size="sm"
            />
          </Tooltip>
        </Flex>
      }
      placeholder="Add a comment"
      w="256"
    />
  );
}
