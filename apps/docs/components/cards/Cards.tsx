import { Grid } from "@optiaxiom/react";

import styles from "./Cards.module.css";
import { CardsItem } from "./CardsItem";
import { AlertDialogIcon } from "./icons/AlertDialogIcon";
import { AlertIcon } from "./icons/AlertIcon";
import { AutocompleteIcon } from "./icons/AutocompleteIcon";
import { CheckboxIcon } from "./icons/CheckboxIcon";
import { DialogIcon } from "./icons/DialogIcon";
import { InputIcon } from "./icons/InputIcon";
import { RadioGroupIcon } from "./icons/RadioGroupIcon";
import { SearchInputIcon } from "./icons/SearchInputIcon";
import { SelectIcon } from "./icons/SelectIcon";
import { StyledSystemIcon } from "./icons/StyledSystemIcon";
import { SwitchIcon } from "./icons/SwitchIcon";
import { TextareaIcon } from "./icons/TextareaIcon";
import { ToastIcon } from "./icons/ToastIcon";

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
  Checkbox: {
    description:
      "Basic control to allow selecting one or more items from a set.",
    href: "/components/checkbox/",
    icon: <CheckboxIcon />,
    title: "Checkbox",
  },
  Components: {
    description:
      "Discover all the components available in our library and how to use them.",
    href: "/components/",
    icon: <DialogIcon />,
    title: "Components",
  },
  Dialog: {
    description: "Display a modal dialog box.",
    href: "/components/dialog/",
    icon: <DialogIcon />,
    title: "Dialog",
  },
  Input: {
    description: "Basic text field for capturing user input.",
    href: "/components/input/",
    icon: <InputIcon />,
    title: "Input",
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
  Select: {
    description:
      "Single select combobox widget to allow selection from a fixed set of options.",
    href: "/components/select/",
    icon: <SelectIcon />,
    title: "Select",
  },
  StyledSystem: {
    description:
      "Learn about our styling solution and how to consume our design tokens.",
    href: "/styled-system/",
    icon: <StyledSystemIcon />,
    title: "Styled System",
  },
  Switch: {
    description:
      "Control to allow toggling between checked and not checked state.",
    href: "/components/switch/",
    icon: <SwitchIcon />,
    title: "Switch",
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
