import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, type ReactNode, useRef } from "react";

import type { CommandOption } from "../command-context";
import type { ExcludeProps, ExtendProps } from "../utils";

import { ComboboxProvider } from "../combobox-context";
import { ComboboxPopover } from "../combobox-popover";
import { Command } from "../command";
import { Dialog } from "../dialog";
import { useResponsiveMatches } from "../use-responsive-matches";

export type ComboboxOption = CommandOption;

type ComboboxProps = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof Command>,
    {
      children: ReactNode;
      defaultInputVisible?: boolean;
      /**
       * The initial open state in uncontrolled mode.
       */
      defaultOpen?: boolean;
      /**
       * Handler that is called when the open state changes.
       */
      onOpenChange?: (open: boolean) => void;
      /**
       * The open state in controlled mode.
       */
      open?: boolean;
      placeholder?: string;
      size?: "lg" | "sm";
    }
  >,
  "onItemSelect"
>;

export function Combobox({
  children,
  defaultInputVisible,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  placeholder = "Filter...",
  size: sizeProp,
  ...props
}: ComboboxProps) {
  const size = useResponsiveMatches({
    base: "lg",
    sm: sizeProp ?? "sm",
  });
  const Comp = size === "sm" ? ComboboxPopover : Dialog;

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Comp onOpenChange={setOpen} open={open}>
      <ComboboxProvider
        defaultInputVisible={defaultInputVisible || false}
        inputRef={inputRef}
        open={open}
        placeholder={placeholder}
        setOpen={setOpen}
        size={size}
      >
        <Command
          onItemSelect={() => {
            if (typeof openProp === "undefined") {
              setOpen(false);
            }
          }}
          {...props}
        >
          {children}
        </Command>
      </ComboboxProvider>
    </Comp>
  );
}

Combobox.displayName = "@optiaxiom/react/Combobox";
