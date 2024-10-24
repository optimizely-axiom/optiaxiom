import type { ReactNode } from "react";

import { Badge, Flex } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge colorScheme="primary">ALPHA</Badge>
  </Flex>
);

export default {
  "--": {
    title: "Components",
    type: "separator",
  },
  index: "Overview",

  "-- Providers": {
    title: "Providers",
    type: "separator",
  },
  "axiom-provider": "AxiomProvider",

  "-- Primitives": {
    title: "Primitives",
    type: "separator",
  },
  box: "Box",
  flex: "Flex",
  grid: "Grid",

  "-- Buttons": {
    title: "Buttons",
    type: "separator",
  },
  button: "Button",
  "toggle-button": "ToggleButton",

  "-- Combobox": {
    title: "Combobox",
    type: "separator",
  },
  autocomplete: {
    title: <AlphaItem>Autocomplete</AlphaItem>,
  },
  select: {
    title: <AlphaItem>Select</AlphaItem>,
  },

  "-- Data Display": {
    title: "Data Display",
    type: "separator",
  },
  avatar: "Avatar",
  disclosure: "Disclosure",
  indicator: "Indicator",
  separator: "Separator",

  "-- Feedback": {
    title: "Feedback",
    type: "separator",
  },
  alert: "Alert",
  badge: "Badge",
  banner: {
    title: <AlphaItem>Banner</AlphaItem>,
  },
  progress: "Progress",
  skeleton: "Skeleton",
  spinner: "Spinner",
  toast: "Toast",

  "-- Forms": {
    title: "Forms",
    type: "separator",
  },
  checkbox: "Checkbox",
  field: "Field",
  input: "Input",
  "radio-group": "RadioGroup",
  "search-input": "SearchInput",
  "segmented-control": {
    title: <AlphaItem>SegmentedControl</AlphaItem>,
  },
  switch: "Switch",
  textarea: "Textarea",

  "-- Navigation": {
    title: "Navigation",
    type: "separator",
  },
  breadcrumb: {
    title: <AlphaItem>Breadcrumb</AlphaItem>,
  },
  link: "Link",
  pagination: "Pagination",
  "side-nav": {
    title: <AlphaItem>SideNav</AlphaItem>,
  },
  tabs: "Tabs",

  "-- Overlays": {
    title: "Overlays",
    type: "separator",
  },
  "alert-dialog": "AlertDialog",
  dialog: "Dialog",
  drawer: "Drawer",
  "dropdown-menu": "DropdownMenu",
  "hover-card": "HoverCard",
  popover: "Popover",
  tooltip: "Tooltip",

  "-- Typography": {
    title: "Typography",
    type: "separator",
  },
  code: "Code",
  heading: "Heading",
  kbd: "Kbd",
  text: "Text",
};
