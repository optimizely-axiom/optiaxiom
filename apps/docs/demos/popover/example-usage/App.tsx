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
  SelectRadioItem,
  SelectTrigger,
  SelectValue,
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

      <PopoverContent gap="sm" px="0">
        <SegmentedControl defaultValue="list" gap="sm" px="md">
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
          px="md"
        >
          <Select defaultValue="Status" items={["Status", "Due Dates"]}>
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="end">
              {["Status", "Due Dates"].map((item) => (
                <SelectRadioItem item={item} key={item}>
                  {item}
                </SelectRadioItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          flexDirection="row"
          justifyContent="space-between"
          label="Grouping"
          px="md"
        >
          <Select
            defaultValue="No grouping"
            items={["No grouping", "Campaign"]}
          >
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="end">
              {["No grouping", "Campaign"].map((item) => (
                <SelectRadioItem item={item} key={item}>
                  {item}
                </SelectRadioItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Separator orientation="horizontal" />

        <Field
          flexDirection="row"
          justifyContent="space-between"
          label="View"
          px="md"
        >
          <Select defaultValue="Tasks" items={["Tasks", "Steps"]}>
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="end">
              {["Tasks", "Steps"].map((item) => (
                <SelectRadioItem item={item} key={item}>
                  {item}
                </SelectRadioItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
