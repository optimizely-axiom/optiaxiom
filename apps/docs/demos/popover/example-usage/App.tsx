import {
  Field,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  Tooltip,
} from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconAdjustmentsHorizontal,
  IconLayoutGrid,
  IconList,
} from "@tabler/icons-react";

export function App() {
  return (
    <Popover>
      <PopoverTrigger icon={<IconAdjustmentsHorizontal />}>
        Display
      </PopoverTrigger>

      <PopoverContent align="end" gap="12" px="0">
        <SegmentedControl defaultValue="list" gap="12" px="16">
          <Tooltip content="List">
            <SegmentedControlItem
              aria-label="List"
              icon={<IconList />}
              size="lg"
              value="list"
            />
          </Tooltip>

          <Tooltip content="Grid">
            <SegmentedControlItem
              aria-label="Grid"
              icon={<IconLayoutGrid />}
              size="lg"
              value="grid"
            />
          </Tooltip>
        </SegmentedControl>

        <Field
          flexDirection="row"
          justifyContent="space-between"
          label="Columns"
          px="16"
        >
          <Select defaultValue="Status" items={["Status", "Due Dates"]}>
            <SelectTrigger ml="12" size="sm" />
            <SelectContent align="end" />
          </Select>
        </Field>

        <Field
          flexDirection="row"
          justifyContent="space-between"
          label="Grouping"
          px="16"
        >
          <Select
            defaultValue="No grouping"
            items={["No grouping", "Campaign"]}
          >
            <SelectTrigger ml="12" size="sm" />
            <SelectContent align="end" />
          </Select>
        </Field>

        <Separator orientation="horizontal" />

        <Field
          flexDirection="row"
          justifyContent="space-between"
          label="View"
          px="16"
        >
          <Select defaultValue="Tasks" items={["Tasks", "Steps"]}>
            <SelectTrigger ml="12" size="sm" />
            <SelectContent align="end" />
          </Select>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
