import { Grid } from "@optiaxiom/react";

import styles from "./Cards.module.css";
import { CardsItem } from "./CardsItem";
import { AlertDialogIcon } from "./icons/AlertDialogIcon";
import { AlertIcon } from "./icons/AlertIcon";
import { AutocompleteIcon } from "./icons/AutocompleteIcon";
import { BannerIcon } from "./icons/BannerIcon";
import { BoxIcon } from "./icons/BoxIcon";
import { ButtonIcon } from "./icons/ButtonIcon";
import { CheckboxIcon } from "./icons/CheckboxIcon";
import { ComboboxIcon } from "./icons/ComboboxIcon";
import { ComponentsIcon } from "./icons/ComponentsIcon";
import { DialogIcon } from "./icons/DialogIcon";
import { DropdownMenuIcon } from "./icons/DropdownMenuIcon";
import { FlexIcon } from "./icons/FlexIcon";
import { GridIcon } from "./icons/GridIcon";
import { HeadingIcon } from "./icons/HeadingIcon";
import { IconsIcon } from "./icons/IconsIcon";
import { IndicatorIcon } from "./icons/IndicatorIcon";
import { InputIcon } from "./icons/InputIcon";
import { PaginationIcon } from "./icons/PaginationIcon";
import { ProgressIcon } from "./icons/ProgressIcon";
import { RadioGroupIcon } from "./icons/RadioGroupIcon";
import { SearchInputIcon } from "./icons/SearchInputIcon";
import { SegmentedControlIcon } from "./icons/SegmentedControlIcon";
import { SelectIcon } from "./icons/SelectIcon";
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

const COMPONENTS = {
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
  Autocomplete: {
    description:
      "Text field with inline autocomplete to show suggestions while allowing freeform user input.",
    href: "/components/autocomplete/",
    icon: <AutocompleteIcon />,
    title: "Autocomplete",
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
    href: "/components/box/",
    icon: <BoxIcon />,
    title: "Box",
  },
  Button: {
    description: "Button component is used to trigger actions.",
    href: "/components/button/",
    icon: <ButtonIcon />,
    title: "Button",
  },
  Checkbox: {
    description:
      "Basic control to allow selecting one or more items from a set.",
    href: "/components/checkbox/",
    icon: <CheckboxIcon />,
    title: "Checkbox",
  },
  Combobox: {
    description:
      "Multi-purpose combobox widget to allow selection from a dynamic set of options.",
    href: "/components/combobox/",
    icon: <ComboboxIcon />,
    title: "Combobox",
  },
  Components: {
    description:
      "Discover all the components available in our library and how to use them.",
    href: "/components/",
    icon: <ComponentsIcon />,
    title: "Components",
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
  Flex: {
    description:
      "Use Flex component to stack items vertically or horizontally.",
    href: "/components/flex/",
    icon: <FlexIcon />,
    title: "Flex",
  },
  Grid: {
    description:
      "Use Grid component to place items in a grid using equal width columns.",
    href: "/components/grid/",
    icon: <GridIcon />,
    title: "Grid",
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
      "Font Awesome icon kit for use with the Optimizely Design System",
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
  Pagination: {
    description: "Display active page and navigate between multiple pages.",
    href: "/components/pagination/",
    icon: <PaginationIcon />,
    title: "Pagination",
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
      "Single select combobox widget to allow selection from a fixed set of options.",
    href: "/components/select/",
    icon: <SelectIcon />,
    title: "Select",
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
  Styling: {
    description:
      "Learn about our styling solution and how to consume our design tokens.",
    href: "/styling/",
    icon: <StylingIcon />,
    title: "Styling",
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
};

export function Cards({ items }: { items: Array<keyof typeof COMPONENTS> }) {
  return (
    <Grid
      className={styles.cards}
      gap="16"
      gridTemplateColumns={["1", "2"]}
      mt="16"
    >
      {items
        .map((name) => COMPONENTS[name])
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
