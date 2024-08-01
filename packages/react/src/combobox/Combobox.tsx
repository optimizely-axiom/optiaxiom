import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode, createContext, useState } from "react";

import { Popover } from "../popover";

type Item = {
  label: string;
  value: string;
};

type ComboboxContextType = {
  items?: Item[];
  onSelect?: (value: string) => void;
  open?: boolean;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  value: string;
};

export const ComboboxContext = createContext<ComboboxContextType | undefined>(
  undefined,
);

export const Combobox = ({
  children,
  defaultOpen,
  defaultValue = "",
  items = [],
  onOpenChange,
  onSelect,
  open: openProp,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultValue?: string;
  items?: Item[];
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string) => void;
  open?: boolean;
}) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useState(defaultValue);

  return (
    <ComboboxContext.Provider
      value={{ items, onSelect, open, setOpen, setValue, value }}
    >
      <Popover onOpenChange={setOpen} open={open}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
};

Combobox.displayName = "@optiaxiom/react/Combobox";
