"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  IconAddComment,
  IconAtr,
  IconImagesmode,
  IconNorth,
} from "@optiaxiom/icons";
import { Button, Group, Textarea, Tooltip } from "@optiaxiom/react";

export function App({
  addonPointerEvents = "none",
}: Pick<ComponentPropsWithoutRef<typeof Textarea>, "addonPointerEvents">) {
  return (
    <Textarea
      addonAfter={
        <Group gap="4" p="4">
          <Tooltip content="Add emoji">
            <Button appearance="subtle" icon={<IconAddComment />} size="sm" />
          </Tooltip>
          <Tooltip content="Add mention">
            <Button appearance="subtle" icon={<IconAtr />} size="sm" />
          </Tooltip>
          <Tooltip content="Upload images">
            <Button appearance="subtle" icon={<IconImagesmode />} size="sm" />
          </Tooltip>

          <Tooltip content="Submit">
            <Button
              appearance="primary"
              icon={<IconNorth />}
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
