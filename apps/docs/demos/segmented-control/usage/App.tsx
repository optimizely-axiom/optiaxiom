import {
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

export function App() {
  return (
    <SegmentedControl defaultValue="list">
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
  );
}
