import { Grid } from "@optiaxiom/react";

import styles from "./Cards.module.css";
import { CardsItem } from "./CardsItem";
import { AlertDialogIcon } from "./icons/AlertDialogIcon";
import { AlertIcon } from "./icons/AlertIcon";
import { BadgeIcon } from "./icons/BadgeIcon";
import { BannerIcon } from "./icons/BannerIcon";
import { BoxIcon } from "./icons/BoxIcon";
import { ButtonIcon } from "./icons/ButtonIcon";
import { CheckboxIcon } from "./icons/CheckboxIcon";
import { ColorsIcon } from "./icons/ColorsIcon";
import { DialogIcon } from "./icons/DialogIcon";
import { DropdownMenuIcon } from "./icons/DropdownMenuIcon";
import { FileUploadIcon } from "./icons/FileUploadIcon";
import { FlexIcon } from "./icons/FlexIcon";
import { FontsIcon } from "./icons/FontsIcon";
import { GridIcon } from "./icons/GridIcon";
import { HeadingIcon } from "./icons/HeadingIcon";
import { IconsIcon } from "./icons/IconsIcon";
import { IndicatorIcon } from "./icons/IndicatorIcon";
import { InputIcon } from "./icons/InputIcon";
import { MCPIcon } from "./icons/MCPIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { PaginationIcon } from "./icons/PaginationIcon";
import { ProgressIcon } from "./icons/ProgressIcon";
import { RadioGroupIcon } from "./icons/RadioGroupIcon";
import { SearchInputIcon } from "./icons/SearchInputIcon";
import { SegmentedControlIcon } from "./icons/SegmentedControlIcon";
import { SelectIcon } from "./icons/SelectIcon";
import { SidebarIcon } from "./icons/SidebarIcon";
import { SkeletonIcon } from "./icons/SkeletonIcon";
import { SpinnerIcon } from "./icons/SpinnerIcon";
import { StylingIcon } from "./icons/StylingIcon";
import { SwitchIcon } from "./icons/SwitchIcon";
import { TableIcon } from "./icons/TableIcon";
import { TextareaIcon } from "./icons/TextareaIcon";
import { TextIcon } from "./icons/TextIcon";
import { ToastIcon } from "./icons/ToastIcon";
import { ToggleButtonIcon } from "./icons/ToggleButtonIcon";
import { TooltipIcon } from "./icons/TooltipIcon";
import { TypographyIcon } from "./icons/TypographyIcon";

const PAGES = {
  Alert: {
    description:
      "Show inline messages about important or time-sensitive changes.",
    href: "/components/alert/",
    icon: <AlertIcon />,
    title: "Alert",
  },
  AlertDialog: {
    description:
      "Display a modal with important content that expects confirmation from the user.",
    href: "/components/alert-dialog/",
    icon: <AlertDialogIcon />,
    title: "AlertDialog",
  },
  Badge: {
    description: "Use to emphasize a status, count, state or value.",
    href: "/components/badge/",
    icon: <BadgeIcon />,
    title: "Badge",
  },
  Banner: {
    description: "Display a prominent message at the top of the screen.",
    href: "/components/banner/",
    icon: <BannerIcon />,
    title: "Banner",
  },
  Box: {
    description:
      "Box is the base component for all our other components and provides a convenient way to use our design tokens and set element styles without having to write any custom CSS.",
    href: "/components/",
    icon: <BoxIcon />,
    title: "Box",
  },
  Button: {
    description: "Button component is used to trigger actions.",
    href: "/components/button/",
    icon: <ButtonIcon />,
    title: "Button",
  },
  Card: {
    description: "Generic container for grouping related components together.",
    href: "/components/card/",
    icon: <BoxIcon />,
    title: "Card",
  },
  Checkbox: {
    description:
      "Basic control to allow selecting one or more items from a set.",
    href: "/components/checkbox/",
    icon: <CheckboxIcon />,
    title: "Checkbox",
  },
  Colors: {
    description:
      "Every text, background, and border color token, with light and dark mode values.",
    href: "/guides/colors/",
    icon: <ColorsIcon />,
    title: "Colors",
  },
  DataTable: {
    description: "Easy to use table and datagrids built using TanStack Table.",
    href: "/components/data-table/",
    icon: <TableIcon />,
    title: "DataTable",
  },
  DesignTokens: {
    description:
      "The full token reference — spacing, sizing, radius, shadow, and type scales.",
    href: "/guides/design-tokens/",
    icon: <StylingIcon />,
    title: "Design Tokens",
  },
  Dialog: {
    description: "Display a modal dialog box.",
    href: "/components/dialog/",
    icon: <DialogIcon />,
    title: "Dialog",
  },
  DropdownMenu: {
    description: "Display a dropdown menu.",
    href: "/components/dropdown-menu/",
    icon: <DropdownMenuIcon />,
    title: "DropdownMenu",
  },
  Field: {
    description:
      "Wrapper for inputs to provide context such as label, help text and required state.",
    href: "/components/field/",
    icon: <InputIcon />,
    title: "Field",
  },
  FileUpload: {
    description: "Capture file input from users with drag and drop.",
    href: "/components/file-upload/",
    icon: <FileUploadIcon />,
    title: "FileUpload",
  },
  Flex: {
    description:
      "Use Flex component to stack items vertically or horizontally.",
    href: "/components/flex/",
    icon: <FlexIcon />,
    title: "Flex",
  },
  Fonts: {
    description:
      "Licensed brand fonts for Optimizely staff. Third parties fall back to free web fonts automatically.",
    href: "/guides/fonts/",
    icon: <FontsIcon />,
    title: "Fonts",
  },
  Grid: {
    description:
      "Use Grid component to place items in a grid using equal width columns.",
    href: "/components/grid/",
    icon: <GridIcon />,
    title: "Grid",
  },
  Group: {
    description:
      "A flexbox layout component for grouping items horizontally or vertically.",
    href: "/components/group/",
    icon: <FlexIcon />,
    title: "Group",
  },
  Heading: {
    description:
      "Heading component is used to display page title and section headings. The default root element is h1 which can be configured using the level prop.",
    href: "/components/heading/",
    icon: <HeadingIcon />,
    title: "Heading",
  },
  Icons: {
    description:
      "Material Symbols kit for use with the Optimizely Design System",
    href: "/guides/icons/",
    icon: <IconsIcon />,
    title: "Icons",
  },
  Indicator: {
    description: "Display a badge at the corner of another element.",
    href: "/components/indicator/",
    icon: <IndicatorIcon />,
    title: "Indicator",
  },
  Input: {
    description: "Basic text field for capturing user input.",
    href: "/components/input/",
    icon: <InputIcon />,
    title: "Input",
  },
  Link: {
    description: "Anchor element for creating hyperlinks.",
    href: "/components/link/",
    icon: <TextIcon />,
    title: "Link",
  },
  MCP: {
    description:
      "MCP server enabling AI assistants to generate accurate Axiom code.",
    href: "/guides/mcp/",
    icon: <MCPIcon />,
    title: "MCP",
  },
  Menu: {
    description: "Dropdown menu for displaying actions.",
    href: "/components/menu/",
    icon: <MenuIcon />,
    title: "Menu",
  },
  NestedOverlays: {
    description:
      "Render third-party menus and dialogs inside Axiom overlays without breaking stacking or focus.",
    href: "/guides/nested-overlays/",
    icon: <DialogIcon />,
    title: "Nested Overlays",
  },
  Pagination: {
    description: "Display active page and navigate between multiple pages.",
    href: "/components/pagination/",
    icon: <PaginationIcon />,
    title: "Pagination",
  },
  Popover: {
    description:
      "Display arbitrary rich content inside a non-modal dialog triggered by a button.",
    href: "/components/popover/",
    icon: <DialogIcon />,
    title: "Popover",
  },
  Progress: {
    description: "Display feedback on status of task or length of a process.",
    href: "/components/progress/",
    icon: <ProgressIcon />,
    title: "Progress",
  },
  RadioGroup: {
    description: "Basic control to allow selecting only one item from a set.",
    href: "/components/radio-group/",
    icon: <RadioGroupIcon />,
    title: "RadioGroup",
  },
  SearchInput: {
    description: "Basic search input field with clear button.",
    href: "/components/search-input/",
    icon: <SearchInputIcon />,
    title: "SearchInput",
  },
  SegmentedControl: {
    description:
      "Toggle buttons for switching between different values or views.",
    href: "/components/segmented-control/",
    icon: <SegmentedControlIcon />,
    title: "SegmentedControl",
  },
  Select: {
    description:
      "Select a value from a list of options inside a dropdown menu.",
    href: "/components/select/",
    icon: <SelectIcon />,
    title: "Select",
  },
  Sidebar: {
    description:
      "Primary navigation menu for left side of the page, with support for branding and links.",
    href: "/components/sidebar/",
    icon: <SidebarIcon />,
    title: "Sidebar",
  },
  Skeleton: {
    description: "Display placeholder content while data is loading.",
    href: "/components/skeleton/",
    icon: <SkeletonIcon />,
    title: "Skeleton",
  },
  Spinner: {
    description: "Used for indicating an unspecified wait time.",
    href: "/components/spinner/",
    icon: <SpinnerIcon />,
    title: "Spinner",
  },
  StyleProps: {
    description:
      "Set an element's styles directly with utility props, backed by our design tokens.",
    href: "/props/",
    icon: <StylingIcon />,
    title: "Style Props",
  },
  Switch: {
    description:
      "Control to allow toggling between checked and not checked state.",
    href: "/components/switch/",
    icon: <SwitchIcon />,
    title: "Switch",
  },
  Table: {
    description: "Display tabular data using rows and columns.",
    href: "/components/table/",
    icon: <TableIcon />,
    title: "Table",
  },
  Tabs: {
    description:
      "Organize content into multiple sections with horizontal navigation.",
    href: "/components/tabs/",
    icon: <SegmentedControlIcon />,
    title: "Tabs",
  },
  Text: {
    description:
      "Display body or any other form of text. By default it outputs the <p> paragraph element.",
    href: "/components/text/",
    icon: <TextIcon />,
    title: "Text",
  },
  Textarea: {
    description: "Multi-line text field for capturing user input.",
    href: "/components/textarea/",
    icon: <TextareaIcon />,
    title: "Textarea",
  },
  Toast: {
    description: "Display brief popup notifications.",
    href: "/components/toast/",
    icon: <ToastIcon />,
    title: "Toast",
  },
  ToggleButton: {
    description:
      "ToggleButton component represents a button that can be toggled on or off.",
    href: "/components/toggle-button/",
    icon: <ToggleButtonIcon />,
    title: "ToggleButton",
  },
  Tooltip: {
    description:
      "Popup with brief information shown when user interacts with an element using keyboard focus or mouse hover.",
    href: "/components/tooltip/",
    icon: <TooltipIcon />,
    title: "Tooltip",
  },
  Typography: {
    description:
      "The type scale, and which component renders each style. Start here before reaching for font props.",
    href: "/guides/typography/",
    icon: <TypographyIcon />,
    title: "Typography",
  },
};

export function Cards({ items }: { items: Array<keyof typeof PAGES> }) {
  return (
    <Grid
      className={styles.cards}
      gap="16"
      gridTemplateColumns={["1", "2"]}
      mt="16"
    >
      {items
        .map((name) => PAGES[name])
        .map((data) => (
          <CardsItem
            href={data.href}
            icon={data.icon}
            key={data.title}
            title={data.title}
          >
            {data.description}
          </CardsItem>
        ))}
    </Grid>
  );
}
