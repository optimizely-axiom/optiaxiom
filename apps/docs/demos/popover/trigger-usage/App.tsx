import {
  Indicator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@optiaxiom/react";
import { IconFilter } from "@tabler/icons-react";

export function App() {
  return (
    <Popover>
      <Indicator content="4" intent="information" variant="solid">
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
