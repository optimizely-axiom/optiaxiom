import type { PropItem } from "react-docgen-typescript";

import * as Components from "@optiaxiom/react";
import * as UnstableComponents from "@optiaxiom/react/unstable";
import { promises as fs } from "fs";

const getProps = async (
  component: keyof typeof Components | keyof typeof UnstableComponents,
) => {
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
  Alert: getProps("Alert"),
  AlertDialog: getProps("AlertDialog"),
  AlertDialogAction: getProps("AlertDialogAction"),
  AlertDialogBody: getProps("AlertDialogBody"),
  AlertDialogCancel: getProps("AlertDialogCancel"),
  AlertDialogContent: getProps("AlertDialogContent"),
  AlertDialogFooter: getProps("AlertDialogFooter"),
  AlertDialogHeader: getProps("AlertDialogHeader"),
  AlertDialogTrigger: getProps("AlertDialogTrigger"),
  Avatar: getProps("Avatar"),
  AvatarGroup: getProps("AvatarGroup"),
  AxiomProvider: getProps("AxiomProvider"),
  Badge: getProps("Badge"),
  Banner: getProps("Banner"),
  Box: getProps("Box"),
  Button: getProps("Button"),
  ButtonGroup: getProps("ButtonGroup"),
  Calendar: getProps("Calendar"),
  Card: getProps("Card"),
  CardCheckbox: getProps("CardCheckbox"),
  CardContent: getProps("CardContent"),
  CardDescription: getProps("CardDescription"),
  CardImage: getProps("CardImage"),
  CardOverflow: getProps("CardOverflow"),
  CardTitle: getProps("CardTitle"),
  Checkbox: getProps("Checkbox"),
  Code: getProps("Code"),
  Combobox: getProps("Combobox"),
  ComboboxCheckboxItem: getProps("ComboboxCheckboxItem"),
  ComboboxContent: getProps("ComboboxContent"),
  ComboboxEmpty: getProps("ComboboxEmpty"),
  ComboboxFooter: getProps("ComboboxFooter"),
  ComboboxGroup: getProps("ComboboxGroup"),
  ComboboxInput: getProps("ComboboxInput"),
  ComboboxItem: getProps("ComboboxItem"),
  ComboboxLabel: getProps("ComboboxLabel"),
  ComboboxRadioItem: getProps("ComboboxRadioItem"),
  ComboboxScrollArea: getProps("ComboboxScrollArea"),
  ComboboxSeparator: getProps("ComboboxSeparator"),
  ComboboxTrigger: getProps("ComboboxTrigger"),
  DataTable: getProps("DataTable"),
  DataTableBody: getProps("DataTableBody"),
  DataTableFooter: getProps("DataTableFooter"),
  DateInput: getProps("DateInput"),
  DatePicker: getProps("DatePicker"),
  DatePickerContent: getProps("DatePickerContent"),
  DatePickerTrigger: getProps("DatePickerTrigger"),
  DateRangePicker: getProps("DateRangePicker"),
  DateRangePickerContent: getProps("DateRangePickerContent"),
  DateRangePickerTrigger: getProps("DateRangePickerTrigger"),
  Dialog: getProps("Dialog"),
  DialogBody: getProps("DialogBody"),
  DialogClose: getProps("DialogClose"),
  DialogContent: getProps("DialogContent"),
  DialogFooter: getProps("DialogFooter"),
  DialogForm: getProps("DialogForm"),
  DialogHeader: getProps("DialogHeader"),
  DialogTrigger: getProps("DialogTrigger"),
  Disclosure: getProps("Disclosure"),
  DisclosureContent: getProps("DisclosureContent"),
  DisclosureTrigger: getProps("DisclosureTrigger"),
  DropdownMenu: getProps("DropdownMenu"),
  DropdownMenuCheckboxItem: getProps("DropdownMenuCheckboxItem"),
  DropdownMenuContent: getProps("DropdownMenuContent"),
  DropdownMenuGroup: getProps("DropdownMenuGroup"),
  DropdownMenuItem: getProps("DropdownMenuItem"),
  DropdownMenuLabel: getProps("DropdownMenuLabel"),
  DropdownMenuSeparator: getProps("DropdownMenuSeparator"),
  DropdownMenuSub: getProps("DropdownMenuSub"),
  DropdownMenuSubContent: getProps("DropdownMenuSubContent"),
  DropdownMenuSubTrigger: getProps("DropdownMenuSubTrigger"),
  DropdownMenuTrigger: getProps("DropdownMenuTrigger"),
  Field: getProps("Field"),
  Flex: getProps("Flex"),
  Grid: getProps("Grid"),
  Heading: getProps("Heading"),
  Indicator: getProps("Indicator"),
  InlineInput: getProps("InlineInput"),
  Input: getProps("Input"),
  Kbd: getProps("Kbd"),
  Link: getProps("Link"),
  ModalLayer: getProps("ModalLayer"),
  Nav: getProps("Nav"),
  NavAccountItem: getProps("NavAccountItem"),
  NavBody: getProps("NavBody"),
  NavFooter: getProps("NavFooter"),
  NavGroup: getProps("NavGroup"),
  NavGroupContent: getProps("NavGroupContent"),
  NavGroupTrigger: getProps("NavGroupTrigger"),
  NavHeader: getProps("NavHeader"),
  NavItem: getProps("NavItem"),
  NavList: getProps("NavList"),
  NavSeparator: getProps("NavSeparator"),
  Pagination: getProps("Pagination"),
  Pill: getProps("Pill"),
  PillGroup: getProps("PillGroup"),
  Popover: getProps("Popover"),
  PopoverContent: getProps("PopoverContent"),
  PopoverTrigger: getProps("PopoverTrigger"),
  Progress: getProps("Progress"),
  Radio: getProps("Radio"),
  RadioGroup: getProps("RadioGroup"),
  SearchInput: getProps("SearchInput"),
  SegmentedControl: getProps("SegmentedControl"),
  SegmentedControlItem: getProps("SegmentedControlItem"),
  Select: getProps("Select"),
  SelectContent: getProps("SelectContent"),
  SelectGroup: getProps("SelectGroup"),
  SelectItem: getProps("SelectItem"),
  SelectLabel: getProps("SelectLabel"),
  SelectRadioItem: getProps("SelectRadioItem"),
  SelectSeparator: getProps("SelectSeparator"),
  SelectTrigger: getProps("SelectTrigger"),
  Separator: getProps("Separator"),
  Sidebar: getProps("Sidebar"),
  SidebarToggle: getProps("SidebarToggle"),
  Skeleton: getProps("Skeleton"),
  Spinner: getProps("Spinner"),
  SubNav: getProps("SubNav"),
  Switch: getProps("Switch"),
  Table: getProps("Table"),
  TableAction: getProps("TableAction"),
  TableBody: getProps("TableBody"),
  TableCell: getProps("TableCell"),
  TableHeader: getProps("TableHeader"),
  TableHeaderCell: getProps("TableHeaderCell"),
  TableRow: getProps("TableRow"),
  Tabs: getProps("Tabs"),
  TabsContent: getProps("TabsContent"),
  TabsList: getProps("TabsList"),
  TabsTrigger: getProps("TabsTrigger"),
  Text: getProps("Text"),
  Textarea: getProps("Textarea"),
  Toast: getProps("Toast"),
  ToastAction: getProps("ToastAction"),
  ToastProvider: getProps("ToastProvider"),
  ToastTitle: getProps("ToastTitle"),
  ToggleButton: getProps("ToggleButton"),
  Tooltip: getProps("Tooltip"),
  TooltipProvider: getProps("TooltipProvider"),
};
