import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode } from "react";

import type { BoxProps } from "../box";

import { ComboboxContextProvider } from "../combobox-context";
import { Popover } from "../popover";

type ComboBoxProps = BoxProps<
  typeof Popover,
  {
    children: ReactNode;
    defaultOpen?: boolean;
    defaultValue?: string | string[];
    mode?: "multiple" | "single";
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string | string[]) => void;
    open?: boolean;
    value?: string | string[];
  }
>;

export function Combobox({
  children,
  defaultOpen,
  defaultValue = "",
  mode = "single",
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
}: Partial<ComboBoxProps>) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  return (
    <ComboboxContextProvider
      mode={mode}
      open={open}
      setOpen={setOpen}
      setValue={setValue}
      value={value}
    >
      <Popover onOpenChange={setOpen} open={open}>
        {children}
      </Popover>
    </ComboboxContextProvider>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
