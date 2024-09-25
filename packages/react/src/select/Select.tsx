import * as RadixSelect from "@radix-ui/react-select";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { useFieldContext } from "../field-context";
import { SelectContextProvider } from "../select-context";

type SelectProps = ComponentPropsWithoutRef<typeof RadixSelect.Root>;

export function Select({
  children,
  defaultOpen,
  defaultValue,
  onOpenChange,
  onValueChange,
  open: openProp,
  value: valueProp,
  ...props
}: SelectProps) {
  const { id: triggerId } = useFieldContext({});

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixSelect.Root
      onOpenChange={setOpen}
      onValueChange={setValue}
      open={open}
      value={value}
      {...props}
    >
      <SelectContextProvider triggerId={triggerId} value={value}>
        {children}
      </SelectContextProvider>
    </RadixSelect.Root>
  );
}

Select.displayName = "@optiaxiom/react/Select";
