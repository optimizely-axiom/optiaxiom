import {
  Button,
  Flex,
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("list");

  return (
    <Flex flexDirection="row">
      <SegmentedControl onValueChange={setValue} value={value}>
        <Tooltip content="List">
          <SegmentedControlItem
            aria-label="List"
            icon={<IconList />}
            value="list"
          />
        </Tooltip>

        <Tooltip content="Grid">
          <SegmentedControlItem
            aria-label="Grid"
            icon={<IconLayoutGrid />}
            value="grid"
          />
        </Tooltip>
      </SegmentedControl>

      <Button disabled={!value} onClick={() => setValue("list")}>
        Reset
      </Button>
    </Flex>
  );
}
