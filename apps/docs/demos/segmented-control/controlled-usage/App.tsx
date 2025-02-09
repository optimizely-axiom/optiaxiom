"use client";

import {
  Button,
  Flex,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";
import {
  IconDeviceImac,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("desktop");

  return (
    <Flex flexDirection="row">
      <SegmentedControl onValueChange={setValue} value={value}>
        <Tooltip content="Desktop">
          <SegmentedControlItem
            aria-label="Desktop"
            icon={<IconDeviceImac />}
            key="desktop"
            value="desktop"
          />
        </Tooltip>
        <Tooltip content="Tablet">
          <SegmentedControlItem
            aria-label="Tablet"
            icon={<IconDeviceTablet />}
            key="tablet"
            value="tablet"
          />
        </Tooltip>
        <Tooltip content="Mobile">
          <SegmentedControlItem
            aria-label="Mobile"
            icon={<IconDeviceMobile />}
            key="mobile"
            value="mobile"
          />
        </Tooltip>
      </SegmentedControl>

      <Button disabled={!value} onClick={() => setValue("desktop")}>
        Reset
      </Button>
    </Flex>
  );
}
