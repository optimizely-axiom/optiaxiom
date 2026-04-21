import { IconFilter } from "@optiaxiom/icons";
import {
  Indicator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@optiaxiom/react";

export function App() {
  return (
    <Popover>
      <Indicator content="4" intent="information" variant="strong">
        <PopoverTrigger
          appearance="subtle"
          aria-label="Filters"
          icon={<IconFilter />}
        />
      </Indicator>

      <PopoverContent>
        <Text>Notification filters</Text>
      </PopoverContent>
    </Popover>
  );
}
