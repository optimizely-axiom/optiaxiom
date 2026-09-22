import type { ReactNode } from "react";

import { Badge, Group } from "@optiaxiom/react";

const AlphaItem = ({ children }: { children?: ReactNode }) => (
  <Group flex="1" gap="16" justifyContent="space-between">
    {children} <Badge intent="warning">ALPHA</Badge>
  </Group>
);

const LegacyItem = ({ children }: { children?: ReactNode }) => (
  <Group flex="1" gap="16" justifyContent="space-between">
    {children} <Badge intent="danger">LEGACY</Badge>
  </Group>
);

/*
 * This file is the canonical sidebar definition — group order, item order,
 * separators, titles and visibility all live here. `flatten-page-map.ts` only
 * hoists these entries into a single flat list, preserving this order.
 */
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

      "css-imports": "CSS Imports",
      mcp: "MCP Server",
      "test-environments": "Test Environments",

      "-- Foundations": {
        title: "Foundations",
        type: "separator",
      },
      colors: "Colors",
      "design-tokens": "Design Tokens",
      typography: "Typography",

      fonts: "Fonts",
      icons: "Icons",

      "-- Guides": {
        title: "Guides",
        type: "separator",
      },
      "responsive-styles": "Responsive Styles",

      "css-layers": "CSS Layers",
      "module-federation": "Module Federation",
      "nested-overlays": "Nested Overlays",
      proteus: "Proteus",

      "group-migration": "Flex to Group migration",

      "proteus-designer": {
        display: "hidden",
        theme: {
          layout: "full",
          toc: false,
        },
        title: "Proteus Designer",
        type: "page",
      },
    },
    title: "Guides",
  },

  components: {
    items: {
      "--": {
        title: "Components",
        type: "separator",
      },
      index: "Box",

      alert: "Alert",
      "alert-dialog": "AlertDialog",
      "angle-menu-button": "AngleMenuButton",
      "auth-provider": "AuthProvider",
      avatar: "Avatar",
      "axiom-provider": "AxiomProvider",
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
      cover: "Cover",
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
      "ellipsis-menu-button": "EllipsisMenuButton",
      field: "Field",
      "file-upload": {
        title: <AlphaItem>FileUpload</AlphaItem>,
      },
      flex: {
        title: <LegacyItem>Flex</LegacyItem>,
      },
      grid: "Grid",
      group: "Group",
      heading: "Heading",
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
      "label-menu-button": "LabelMenuButton",
      layout: {
        title: <AlphaItem>Layout</AlphaItem>,
      },
      link: "Link",
      menu: "Menu",
      "modal-layer": "ModalLayer",
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
      separator: "Separator",
      sidebar: "Sidebar",
      skeleton: "Skeleton",
      sortable: {
        title: <AlphaItem>Sortable</AlphaItem>,
      },
      spinner: "Spinner",
      switch: "Switch",
      table: "Table",
      tabs: "Tabs",
      text: "Text",
      textarea: "Textarea",
      toast: "Toast",
      "toggle-button": "ToggleButton",
      tooltip: "Tooltip",
    },
    title: "Components",
  },

  props: {
    items: {
      "--": {
        title: "Props",
        type: "separator",
      },
      index: "Style Props",

      "align-items": "Align Items",
      "align-self": "Align Self",
      animation: "Animation",
      "background-color": "Background Color",
      "border-color": "Border Color",
      "border-radius": "Border Radius",
      "border-width": "Border Width",
      "box-shadow": "Box Shadow",
      display: "Display",
      flex: "Flex",
      "flex-direction": "Flex Direction",
      "flex-wrap": "Flex Wrap",
      "font-family": "Font Family",
      "font-size": "Font Size",
      "font-weight": "Font Weight",
      gap: "Gap",
      "grid-column": "Grid Column",
      "grid-template-columns": "Grid Template Columns",
      height: "Height",
      "justify-content": "Justify Content",
      margin: "Margin",
      "max-height": "Max Height",
      "max-width": "Max Width",
      "object-fit": "Object Fit",
      overflow: "Overflow",
      padding: "Padding",
      size: "Size",
      "text-align": "Text Align",
      "text-color": "Text Color",
      "transition-property": "Transition Property",
      width: "Width",
      "z-index": "Z-Index",
    },
    title: "Props",
  },
};
