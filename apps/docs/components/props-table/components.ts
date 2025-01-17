import type { PropItem } from "react-docgen-typescript";

import { promises as fs } from "fs";

const getProps = async (component: string) => {
  const docs = JSON.parse(
    await fs.readFile(process.cwd() + "/data/props.json", "utf8"),
  ) as Array<{
    displayName: string;
    props: PropItem[];
  }>;
  const doc = docs.find(
    (doc) => doc.displayName === `@optiaxiom/react/${component}`,
  );
  if (!doc) {
    throw new Error(`Could not find component doc: ${component}`);
  }

  return doc.props;
};

export const components = {
  Alert: {
    name: "Alert",
    props: getProps("Alert"),
  },
  AlertDialog: {
    name: "AlertDialog",
    props: getProps("AlertDialog"),
  },
  AlertDialogAction: {
    name: "AlertDialogAction",
    props: getProps("AlertDialogAction"),
  },
  AlertDialogBody: {
    name: "AlertDialogBody",
    props: getProps("AlertDialogBody"),
  },
  AlertDialogCancel: {
    name: "AlertDialogCancel",
    props: getProps("AlertDialogCancel"),
  },
  AlertDialogContent: {
    name: "AlertDialogContent",
    props: getProps("AlertDialogContent"),
  },
  AlertDialogFooter: {
    name: "AlertDialogFooter",
    props: getProps("AlertDialogFooter"),
  },
  AlertDialogHeader: {
    name: "AlertDialogHeader",
    props: getProps("AlertDialogHeader"),
  },
  AlertDialogTrigger: {
    name: "AlertDialogTrigger",
    props: getProps("AlertDialogTrigger"),
  },
  Autocomplete: {
    name: "Autocomplete",
    props: getProps("Autocomplete"),
  },
  AutocompleteContent: {
    name: "AutocompleteContent",
    props: getProps("AutocompleteContent"),
  },
  AutocompleteEmpty: {
    name: "AutocompleteEmpty",
    props: getProps("AutocompleteEmpty"),
  },
  AutocompleteRadioItem: {
    name: "AutocompleteRadioItem",
    props: getProps("AutocompleteRadioItem"),
  },
  AutocompleteTrigger: {
    name: "AutocompleteTrigger",
    props: getProps("AutocompleteTrigger"),
  },
  Avatar: {
    name: "Avatar",
    props: getProps("Avatar"),
  },
  AvatarGroup: {
    name: "AvatarGroup",
    props: getProps("AvatarGroup"),
  },
  AxiomProvider: {
    name: "AxiomProvider",
    props: getProps("AxiomProvider"),
  },
  Badge: {
    name: "Badge",
    props: getProps("Badge"),
  },
  Banner: {
    name: "Banner",
    props: getProps("Banner"),
  },
  Box: {
    name: "Box",
    props: getProps("Box"),
  },
  Button: {
    name: "Button",
    props: getProps("Button"),
  },
  ButtonGroup: {
    name: "ButtonGroup",
    props: getProps("ButtonGroup"),
  },
  Checkbox: {
    name: "Checkbox",
    props: getProps("Checkbox"),
  },
  Code: {
    name: "Code",
    props: getProps("Code"),
  },
  Combobox: {
    name: "Combobox",
    props: getProps("Combobox"),
  },
  ComboboxCheckboxItem: {
    name: "ComboboxCheckboxItem",
    props: getProps("ComboboxCheckboxItem"),
  },
  ComboboxContent: {
    name: "ComboboxContent",
    props: getProps("ComboboxContent"),
  },
  ComboboxEmpty: {
    name: "ComboboxEmpty",
    props: getProps("ComboboxEmpty"),
  },
  ComboboxFooter: {
    name: "ComboboxFooter",
    props: getProps("ComboboxFooter"),
  },
  ComboboxGroup: {
    name: "ComboboxGroup",
    props: getProps("ComboboxGroup"),
  },
  ComboboxInput: {
    name: "ComboboxInput",
    props: getProps("ComboboxInput"),
  },
  ComboboxItem: {
    name: "ComboboxItem",
    props: getProps("ComboboxItem"),
  },
  ComboboxLabel: {
    name: "ComboboxLabel",
    props: getProps("ComboboxLabel"),
  },
  ComboboxRadioItem: {
    name: "ComboboxRadioItem",
    props: getProps("ComboboxRadioItem"),
  },
  ComboboxScrollArea: {
    name: "ComboboxScrollArea",
    props: getProps("ComboboxScrollArea"),
  },
  ComboboxSeparator: {
    name: "ComboboxSeparator",
    props: getProps("ComboboxSeparator"),
  },
  ComboboxTrigger: {
    name: "ComboboxTrigger",
    props: getProps("ComboboxTrigger"),
  },
  ComboboxValue: {
    name: "ComboboxValue",
    props: getProps("ComboboxValue"),
  },
  DataTable: {
    name: "DataTable",
    props: getProps("DataTable"),
  },
  Dialog: {
    name: "Dialog",
    props: getProps("Dialog"),
  },
  DialogBody: {
    name: "DialogBody",
    props: getProps("DialogBody"),
  },
  DialogClose: {
    name: "DialogClose",
    props: getProps("DialogClose"),
  },
  DialogContent: {
    name: "DialogContent",
    props: getProps("DialogContent"),
  },
  DialogFooter: {
    name: "DialogFooter",
    props: getProps("DialogFooter"),
  },
  DialogForm: {
    name: "DialogForm",
    props: getProps("DialogForm"),
  },
  DialogHeader: {
    name: "DialogHeader",
    props: getProps("DialogHeader"),
  },
  DialogTrigger: {
    name: "DialogTrigger",
    props: getProps("DialogTrigger"),
  },
  Disclosure: {
    name: "Disclosure",
    props: getProps("Disclosure"),
  },
  DisclosureContent: {
    name: "DisclosureContent",
    props: getProps("DisclosureContent"),
  },
  DisclosureTrigger: {
    name: "DisclosureTrigger",
    props: getProps("DisclosureTrigger"),
  },
  DropdownMenu: {
    name: "DropdownMenu",
    props: getProps("DropdownMenu"),
  },
  DropdownMenuContent: {
    name: "DropdownMenuContent",
    props: getProps("DropdownMenuContent"),
  },
  DropdownMenuGroup: {
    name: "DropdownMenuGroup",
    props: getProps("DropdownMenuGroup"),
  },
  DropdownMenuItem: {
    name: "DropdownMenuItem",
    props: getProps("DropdownMenuItem"),
  },
  DropdownMenuLabel: {
    name: "DropdownMenuLabel",
    props: getProps("DropdownMenuLabel"),
  },
  DropdownMenuSeparator: {
    name: "DropdownMenuSeparator",
    props: getProps("DropdownMenuSeparator"),
  },
  DropdownMenuSub: {
    name: "DropdownMenuSub",
    props: getProps("DropdownMenuSub"),
  },
  DropdownMenuSubContent: {
    name: "DropdownMenuSubContent",
    props: getProps("DropdownMenuSubContent"),
  },
  DropdownMenuSubTrigger: {
    name: "DropdownMenuSubTrigger",
    props: getProps("DropdownMenuSubTrigger"),
  },
  DropdownMenuTrigger: {
    name: "DropdownMenuTrigger",
    props: getProps("DropdownMenuTrigger"),
  },
  Field: {
    name: "Field",
    props: getProps("Field"),
  },
  Flex: {
    name: "Flex",
    props: getProps("Flex"),
  },
  Grid: {
    name: "Grid",
    props: getProps("Grid"),
  },
  Heading: {
    name: "Heading",
    props: getProps("Heading"),
  },
  Indicator: {
    name: "Indicator",
    props: getProps("Indicator"),
  },
  InlineInput: {
    name: "InlineInput",
    props: getProps("InlineInput"),
  },
  Input: {
    name: "Input",
    props: getProps("Input"),
  },
  Kbd: {
    name: "Kbd",
    props: getProps("Kbd"),
  },
  Link: {
    name: "Link",
    props: getProps("Link"),
  },
  ModalLayer: {
    name: "ModalLayer",
    props: getProps("ModalLayer"),
  },
  Pagination: {
    name: "Pagination",
    props: getProps("Pagination"),
  },
  Popover: {
    name: "Popover",
    props: getProps("Popover"),
  },
  PopoverContent: {
    name: "PopoverContent",
    props: getProps("PopoverContent"),
  },
  PopoverTrigger: {
    name: "PopoverTrigger",
    props: getProps("PopoverTrigger"),
  },
  Progress: {
    name: "Progress",
    props: getProps("Progress"),
  },
  Radio: {
    name: "Radio",
    props: getProps("Radio"),
  },
  RadioGroup: {
    name: "RadioGroup",
    props: getProps("RadioGroup"),
  },
  SearchInput: {
    name: "SearchInput",
    props: getProps("SearchInput"),
  },
  SegmentedControl: {
    name: "SegmentedControl",
    props: getProps("SegmentedControl"),
  },
  SegmentedControlItem: {
    name: "SegmentedControlItem",
    props: getProps("SegmentedControlItem"),
  },
  Select: {
    name: "Select",
    props: getProps("Select"),
  },
  SelectContent: {
    name: "SelectContent",
    props: getProps("SelectContent"),
  },
  SelectGroup: {
    name: "SelectGroup",
    props: getProps("SelectGroup"),
  },
  SelectItem: {
    name: "SelectItem",
    props: getProps("SelectItem"),
  },
  SelectLabel: {
    name: "SelectLabel",
    props: getProps("SelectLabel"),
  },
  SelectRadioItem: {
    name: "SelectRadioItem",
    props: getProps("SelectRadioItem"),
  },
  SelectSeparator: {
    name: "SelectSeparator",
    props: getProps("SelectSeparator"),
  },
  SelectTrigger: {
    name: "SelectTrigger",
    props: getProps("SelectTrigger"),
  },
  SelectValue: {
    name: "SelectValue",
    props: getProps("SelectValue"),
  },
  Separator: {
    name: "Separator",
    props: getProps("Separator"),
  },
  Sidenav: {
    name: "Sidenav",
    props: getProps("Sidenav"),
  },
  SidenavAccountItem: {
    name: "SidenavAccountItem",
    props: getProps("SidenavAccountItem"),
  },
  SidenavBody: {
    name: "SidenavBody",
    props: getProps("SidenavBody"),
  },
  SidenavFooter: {
    name: "SidenavFooter",
    props: getProps("SidenavFooter"),
  },
  SidenavHeader: {
    name: "SidenavHeader",
    props: getProps("SidenavHeader"),
  },
  SidenavItem: {
    name: "SidenavItem",
    props: getProps("SidenavItem"),
  },
  SidenavToggle: {
    name: "SidenavToggle",
    props: getProps("SidenavToggle"),
  },
  Skeleton: {
    name: "Skeleton",
    props: getProps("Skeleton"),
  },
  Spinner: {
    name: "Spinner",
    props: getProps("Spinner"),
  },
  Switch: {
    name: "Switch",
    props: getProps("Switch"),
  },
  Table: {
    name: "Table",
    props: getProps("Table"),
  },
  TableBody: {
    name: "TableBody",
    props: getProps("TableBody"),
  },
  TableCell: {
    name: "TableCell",
    props: getProps("TableCell"),
  },
  TableHeader: {
    name: "TableHeader",
    props: getProps("TableHeader"),
  },
  TableHeaderCell: {
    name: "TableHeaderCell",
    props: getProps("TableHeaderCell"),
  },
  TableRow: {
    name: "TableRow",
    props: getProps("TableRow"),
  },
  Tabs: {
    name: "Tabs",
    props: getProps("Tabs"),
  },
  TabsContent: {
    name: "TabsContent",
    props: getProps("TabsContent"),
  },
  TabsList: {
    name: "TabsList",
    props: getProps("TabsList"),
  },
  TabsTrigger: {
    name: "TabsTrigger",
    props: getProps("TabsTrigger"),
  },
  Text: {
    name: "Text",
    props: getProps("Text"),
  },
  Textarea: {
    name: "Textarea",
    props: getProps("Textarea"),
  },
  Toast: {
    name: "Toast",
    props: getProps("Toast"),
  },
  ToastAction: {
    name: "ToastAction",
    props: getProps("ToastAction"),
  },
  ToastProvider: {
    name: "ToastProvider",
    props: getProps("ToastProvider"),
  },
  ToastTitle: {
    name: "ToastTitle",
    props: getProps("ToastTitle"),
  },
  ToggleButton: {
    name: "ToggleButton",
    props: getProps("ToggleButton"),
  },
  Tooltip: {
    name: "Tooltip",
    props: getProps("Tooltip"),
  },
  TooltipProvider: {
    name: "TooltipProvider",
    props: getProps("TooltipProvider"),
  },
};
