import type { ReactNode } from "react";

import { Badge, Flex } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge intent="primary">ALPHA</Badge>
  </Flex>
);

export default {
  "--": {
    title: "Components",
    type: "separator",
  },
  index: "Box",

  flex: "Flex",
  grid: "Grid",

  "-- Providers": {
    title: "Providers",
    type: "separator",
  },
  "axiom-provider": "AxiomProvider",

  "-- Buttons": {
    title: "Buttons",
    type: "separator",
  },
  button: "Button",
  "toggle-button": "ToggleButton",

  "-- Comboboxes": {
    title: "Comboboxes",
    type: "separator",
  },
  autocomplete: {
    title: <AlphaItem>Autocomplete</AlphaItem>,
  },
  combobox: {
    title: <AlphaItem>Combobox</AlphaItem>,
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
  table: {
    title: <AlphaItem>Table</AlphaItem>,
  },

  "-- Feedback": {
    title: "Feedback",
    type: "separator",
  },
  alert: "Alert",
  badge: "Badge",
  banner: "Banner",
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
  "inline-input": {
    title: <AlphaItem>InlineInput</AlphaItem>,
  },
  input: "Input",
  "radio-group": "RadioGroup",
  "search-input": "SearchInput",
  "segmented-control": "SegmentedControl",
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
  sidenav: {
    title: <AlphaItem>Sidenav</AlphaItem>,
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
