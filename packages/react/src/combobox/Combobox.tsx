import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode, useState } from "react";

import type { BoxProps } from "../box";

import { ComboboxContext } from "../combobox-context";
import { Popover } from "../popover";

type ComboBoxProps = BoxProps<
  typeof Popover,
  {
    children: ReactNode;
    defaultOpen?: boolean;
    defaultValue?: string;
    mode?: "multiple" | "single";
    onOpenChange?: (open: boolean) => void;
    onSelect?: (value: string) => void;
    open?: boolean;
  }
>;

export const Combobox = ({
  children,
  defaultOpen,
  defaultValue = "",
  mode = "single",
  onOpenChange,
  onSelect,
  open: openProp,
}: Partial<ComboBoxProps>) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useState(defaultValue);

  return (
    <ComboboxContext.Provider
      value={{ mode, onSelect, open, setOpen, setValue, value }}
    >
      <Popover onOpenChange={setOpen} open={open}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
};

Combobox.displayName = "@optiaxiom/react/Combobox";
