import { IconGridView, IconListAlt } from "@optiaxiom/icons";
import {
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";

export function App() {
  return (
    <SegmentedControl defaultValue="list">
      <Tooltip content="List">
        <SegmentedControlItem
          aria-label="List"
          icon={<IconListAlt />}
          value="list"
        />
      </Tooltip>

      <Tooltip content="Grid">
        <SegmentedControlItem
          aria-label="Grid"
          icon={<IconGridView />}
          value="grid"
        />
      </Tooltip>
    </SegmentedControl>
  );
}
