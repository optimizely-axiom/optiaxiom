import type { ReactNode } from "react";

import { Badge, Flex } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge intent="primary">ALPHA</Badge>
  </Flex>
);

export default {
  "--": {
    title: "Primitives",
    type: "separator",
  },
  index: "Box",

  flex: "Flex",
  grid: "Grid",
  separator: "Separator",

  "-- Providers": {
    title: "Providers",
    type: "separator",
  },
  "axiom-provider": "AxiomProvider",

  "-- Components": {
    title: "Components",
    type: "separator",
  },
  alert: "Alert",
  "alert-dialog": "AlertDialog",
  autocomplete: {
    title: <AlphaItem>Autocomplete</AlphaItem>,
  },
  avatar: "Avatar",
  badge: "Badge",
  banner: "Banner",
  breadcrumb: {
    title: <AlphaItem>Breadcrumb</AlphaItem>,
  },
  button: "Button",
  checkbox: "Checkbox",
  code: "Code",
  combobox: {
    title: <AlphaItem>Combobox</AlphaItem>,
  },
  "data-table": {
    title: <AlphaItem>DataTable</AlphaItem>,
  },
  dialog: "Dialog",
  disclosure: "Disclosure",
  drawer: "Drawer",
  "dropdown-menu": "DropdownMenu",
  field: "Field",
  heading: "Heading",
  indicator: "Indicator",
  "inline-input": {
    display: "hidden",
  },
  input: "Input",
  kbd: "Kbd",
  link: "Link",
  pagination: "Pagination",
  popover: "Popover",
  progress: "Progress",
  "radio-group": "RadioGroup",
  "search-input": "SearchInput",
  "segmented-control": "SegmentedControl",
  select: {
    title: <AlphaItem>Select</AlphaItem>,
  },
  sidenav: {
    title: <AlphaItem>Sidenav</AlphaItem>,
  },
  skeleton: "Skeleton",
  spinner: "Spinner",
  switch: "Switch",
  table: {
    title: <AlphaItem>Table</AlphaItem>,
  },
  tabs: "Tabs",
  text: "Text",
  textarea: "Textarea",
  toast: "Toast",
  "toggle-button": "ToggleButton",
  tooltip: "Tooltip",

  "-- Utilities": {
    title: "Utilities",
    type: "separator",
  },
  "modal-layer": "ModalLayer",
};
