import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, type ReactNode, useRef } from "react";

import type { CommandOption } from "../command-context";
import type { ExcludeProps, ExtendProps } from "../utils";

import { Command } from "../command";
import { Dialog } from "../dialog";
import { MenuProvider } from "../menu-context";
import { MenuPopover } from "../menu-popover";
import { useResponsiveMatches } from "../use-responsive-matches";

export type MenuOption = CommandOption;

type MenuProps = ExcludeProps<
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
  "onOptionSelect"
>;

export function Menu({
  children,
  defaultInputVisible,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
  placeholder = "Filter...",
  size: sizeProp,
  ...props
}: MenuProps) {
  const size = useResponsiveMatches({
    base: "lg",
    sm: sizeProp ?? "sm",
  });
  const Comp = size === "sm" ? MenuPopover : Dialog;

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Comp onOpenChange={setOpen} open={open}>
      <MenuProvider
        defaultInputVisible={defaultInputVisible || false}
        inputRef={inputRef}
        open={open}
        placeholder={placeholder}
        setOpen={setOpen}
        size={size}
      >
        <Command
          onOptionSelect={() => {
            if (typeof openProp === "undefined") {
              setOpen(false);
            }
          }}
          {...props}
        >
          {children}
        </Command>
      </MenuProvider>
    </Comp>
  );
}

Menu.displayName = "@optiaxiom/react/Menu";
