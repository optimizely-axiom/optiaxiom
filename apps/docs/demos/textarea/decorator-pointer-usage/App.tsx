import type { ComponentPropsWithoutRef } from "react";

import { Button, Flex, Textarea, Tooltip } from "@optiaxiom/react";
import {
  IconArrowUp,
  IconAt,
  IconMoodSmile,
  IconPhoto,
} from "@tabler/icons-react";

export function App({
  decoratorPointerEvents = "none",
}: Pick<ComponentPropsWithoutRef<typeof Textarea>, "decoratorPointerEvents">) {
  return (
    <Textarea
      decoratorPointerEvents={decoratorPointerEvents}
      endDecorator={
        <Flex flexDirection="row" gap="4" p="4">
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
