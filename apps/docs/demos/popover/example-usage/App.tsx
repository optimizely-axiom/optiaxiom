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
  SelectItem,
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
          <Select items={["Status", "Due Dates"]} value="Status">
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {["Status", "Due Dates"].map((item) => (
                <SelectItem item={item} key={item}>
                  {item}
                </SelectItem>
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
          <Select items={["No grouping", "Campaign"]} value="No grouping">
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {["No grouping", "Campaign"].map((item) => (
                <SelectItem item={item} key={item}>
                  {item}
                </SelectItem>
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
          <Select items={["Tasks", "Steps"]} value="Tasks">
            <SelectTrigger ml="sm" size="sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {["Tasks", "Steps"].map((item) => (
                <SelectItem item={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
