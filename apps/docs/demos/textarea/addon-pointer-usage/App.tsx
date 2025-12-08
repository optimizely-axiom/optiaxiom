"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Button, Group, Textarea, Tooltip } from "@optiaxiom/react";
import {
  IconArrowUp,
  IconAt,
  IconMoodSmile,
  IconPhoto,
} from "@tabler/icons-react";

export function App({
  addonPointerEvents = "none",
}: Pick<ComponentPropsWithoutRef<typeof Textarea>, "addonPointerEvents">) {
  return (
    <Textarea
      addonAfter={
        <Group gap="4" p="4">
          <Tooltip content="Add emoji">
            <Button appearance="subtle" icon={<IconMoodSmile />} size="sm" />
          </Tooltip>
          <Tooltip content="Add mention">
            <Button appearance="subtle" icon={<IconAt />} size="sm" />
          </Tooltip>
          <Tooltip content="Upload images">
            <Button appearance="subtle" icon={<IconPhoto />} size="sm" />
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
      addonPointerEvents={addonPointerEvents}
      placeholder="Add a comment"
      w="224"
    />
  );
}
