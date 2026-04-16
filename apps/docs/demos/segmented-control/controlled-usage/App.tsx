"use client";

import { IconDesktopMac, IconMobile, IconTablet } from "@optiaxiom/icons";
import {
  Button,
  Group,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("desktop");

  return (
    <Group gap="16">
      <SegmentedControl onValueChange={setValue} value={value}>
        <Tooltip content="Desktop">
          <SegmentedControlItem
            aria-label="Desktop"
            icon={<IconDesktopMac />}
            key="desktop"
            value="desktop"
          />
        </Tooltip>
        <Tooltip content="Tablet">
          <SegmentedControlItem
            aria-label="Tablet"
            icon={<IconTablet />}
            key="tablet"
            value="tablet"
          />
        </Tooltip>
        <Tooltip content="Mobile">
          <SegmentedControlItem
            aria-label="Mobile"
            icon={<IconMobile />}
            key="mobile"
            value="mobile"
          />
        </Tooltip>
      </SegmentedControl>
      <Button disabled={!value} onClick={() => setValue("desktop")}>
        Reset
      </Button>
    </Group>
  );
}
