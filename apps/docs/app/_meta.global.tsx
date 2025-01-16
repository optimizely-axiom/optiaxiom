import type { ReactNode } from "react";

import { Badge, Flex } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge intent="primary">ALPHA</Badge>
  </Flex>
);

export default {
  iframe: {
    display: "hidden",
  },

  index: {
    display: "hidden",
    theme: { layout: "full" },
    title: "Axiom",
    type: "page",
  },

  guides: {
    items: {
      "--": {
        title: "Getting Started",
        type: "separator",
      },
      index: "Installation",

      "-- Guides": {
        title: "Guides",
        type: "separator",
      },
      "css-imports": "CSS Imports",
      "css-layers": "CSS Layers",
      icons: "Icons",
      "react-select": "React Select",
    },
    title: "Guides",
    type: "page",
  },

  components: {
    items: {
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
      code: {
        display: "hidden",
      },
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
      kbd: {
        display: "hidden",
      },
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
    },
    title: "Components",
    type: "page",
  },

  styling: {
    items: {
      "--": {
        title: "Styling",
        type: "separator",
      },
      index: "Style Props",

      "design-tokens": "Design Tokens",
      "responsive-styles": "Responsive Styles",

      colors: "Colors",

      "-- Layout": {
        title: "Layout",
        type: "separator",
      },
      gap: "Gap",
      margin: "Margin",
      padding: "Padding",
      "z-index": "Z-Index",

      "-- Sizing": {
        title: "Sizing",
        type: "separator",
      },
      height: "Height",
      "max-height": "Max-Height",
      "max-width": "Max-Width",
      size: "Size",
      width: "Width",

      "-- Typography": {
        title: "Typography",
        type: "separator",
      },
      "font-family": "Font Family",
      "font-size": "Font Size",
      "text-color": "Text Color",

      "-- Backgrounds": {
        title: "Backgrounds",
        type: "separator",
      },
      "background-color": "Background Color",

      "-- Borders": {
        title: "Borders",
        type: "separator",
      },
      "border-color": "Border Color",
      "border-radius": "Border Radius",
      "border-width": "Border Width",

      "-- Effects": {
        title: "Effects",
        type: "separator",
      },
      "box-shadow": "Box Shadow",

      "-- Transitions & Animation": {
        title: "Transitions & Animation",
        type: "separator",
      },
      animation: "Animation",
      "transition-property": "Transition Property",
    },
    title: "Styling",
    type: "page",
  },
};
