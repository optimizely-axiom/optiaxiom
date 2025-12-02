import type { ReactNode } from "react";

import { Badge, Flex } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge intent="primary">ALPHA</Badge>
  </Flex>
);

const LegacyItem = ({ children }: { children?: ReactNode }) => (
  <Flex flex="1" flexDirection="row" justifyContent="space-between">
    {children} <Badge intent="danger">LEGACY</Badge>
  </Flex>
);

export default {
  index: {
    display: "hidden",
    theme: {
      layout: "full",
      toc: false,
    },
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
      "test-environments": "Test Environments",

      mcp: "MCP Server",

      "-- Guides": {
        title: "Guides",
        type: "separator",
      },
      "css-imports": "CSS Imports",
      "css-layers": "CSS Layers",
      icons: "Icons",
      "module-federation": "Module Federation",
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

      cover: "Cover",
      flex: "Flex",
      grid: "Grid",
      heading: "Heading",
      separator: "Separator",
      text: "Text",

      "-- Providers": {
        title: "Providers",
        type: "separator",
      },
      "axiom-provider": "AxiomProvider",

      "auth-provider": "AuthProvider",

      "-- Components": {
        title: "Components",
        type: "separator",
      },
      alert: "Alert",
      "alert-dialog": "AlertDialog",
      avatar: "Avatar",
      badge: "Badge",
      banner: "Banner",
      breadcrumb: "Breadcrumb",
      button: "Button",
      calendar: {
        display: "hidden",
      },
      card: "Card",
      checkbox: "Checkbox",
      code: {
        display: "hidden",
      },
      "data-table": "DataTable",
      "date-input": "DateInput",
      "date-range-picker": "DateRangePicker",
      "details-panel": {
        title: <AlphaItem>DetailsPanel</AlphaItem>,
      },
      dialog: "Dialog",
      disclosure: "Disclosure",
      "dropdown-menu": {
        title: <LegacyItem>DropdownMenu</LegacyItem>,
      },
      field: "Field",
      "file-upload": {
        title: <AlphaItem>FileUpload</AlphaItem>,
      },
      "hover-card": {
        title: <AlphaItem>HoverCard</AlphaItem>,
      },
      indicator: "Indicator",
      "inline-input": {
        display: "hidden",
      },
      input: "Input",
      kbd: {
        display: "hidden",
      },
      layout: {
        title: <AlphaItem>Layout</AlphaItem>,
      },
      link: "Link",
      menu: "Menu",
      pagination: "Pagination",
      pill: {
        title: <AlphaItem>Pill</AlphaItem>,
      },
      "pill-menu": {
        title: <AlphaItem>PillMenu</AlphaItem>,
      },
      popover: "Popover",
      progress: "Progress",
      "radio-group": "RadioGroup",
      range: {
        title: <AlphaItem>Range</AlphaItem>,
      },
      "search-input": "SearchInput",
      "segmented-control": "SegmentedControl",
      select: "Select",
      sidebar: "Sidebar",
      skeleton: "Skeleton",
      sortable: {
        title: <AlphaItem>Sortable</AlphaItem>,
      },
      spinner: "Spinner",
      switch: "Switch",
      table: "Table",
      tabs: "Tabs",
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
      display: "Display",
      margin: "Margin",
      "object-fit": "Object Fit",
      overflow: "Overflow",
      padding: "Padding",
      "z-index": "Z-Index",

      "-- Flexbox & Grid": {
        title: "Flexbox & Grid",
        type: "separator",
      },
      "align-items": "Align Items",
      "align-self": "Align Self",
      flex: "Flex",
      "flex-direction": "Flex Direction",
      "flex-wrap": "Flex Wrap",
      gap: "Gap",
      "grid-column": "Grid Column",
      "grid-template-columns": "Grid Template Columns",
      "justify-content": "Justify Content",

      "-- Sizing": {
        title: "Sizing",
        type: "separator",
      },
      height: "Height",
      "max-height": "Max Height",
      "max-width": "Max Width",
      size: "Size",
      width: "Width",

      "-- Typography": {
        title: "Typography",
        type: "separator",
      },
      "font-family": "Font Family",
      "font-size": "Font Size",
      "font-weight": "Font Weight",
      "text-align": "Text Align",
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
