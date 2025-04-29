import {
  Field,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  SelectContent,
  SelectTrigger,
  Separator,
  Tooltip,
} from "@optiaxiom/react";
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
          <Select
            defaultValue="Status"
            options={[
              { label: "Status", value: "Status" },
              { label: "Due Dates", value: "Due Dates" },
            ]}
          >
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
            options={[
              { label: "No grouping", value: "No grouping" },
              { label: "Campaign", value: "Campaign" },
            ]}
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
          <Select
            defaultValue="Tasks"
            options={[
              { label: "Tasks", value: "Tasks" },
              { label: "Steps", value: "Steps" },
            ]}
          >
            <SelectTrigger ml="12" size="sm" />
            <SelectContent align="end" />
          </Select>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
