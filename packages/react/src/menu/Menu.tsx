import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ExcludeProps, ExtendProps } from "../utils";

import { Command } from "../command";
import { type CommandOption, resolveItemProperty } from "../command/internals";
import { Dialog } from "../dialog";
import { useResponsiveMatches } from "../hooks";
import { MenuProvider } from "./MenuContext";
import { MenuPopover } from "./MenuPopover";
import { MenuSubProvider } from "./MenuSubContext";

export type MenuOption = CommandOption;

export type MenuProps = ExcludeProps<
  ExtendProps<
    ComponentPropsWithoutRef<typeof Command>,
    {
      children: ReactNode;
      /**
       * The initial open state in uncontrolled mode.
       */
      defaultOpen?: boolean;
      initialInputVisible?: boolean;
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
  "onSelect"
>;

export function Menu({
  children,
  defaultOpen = false,
  initialInputVisible,
  inputValue: inputValueProp,
  onInputValueChange,
  onOpenChange,
  open: openProp,
  options: optionsProp,
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
    caller: "@optiaxiom/react/Menu",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [inputValue, setInputValue] = useControllableState({
    caller: "@optiaxiom/react/Menu",
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });

  const [activeItems, setActiveItems] = useState<CommandOption[]>();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  useEffect(() => {
    if (inputValue && size === "sm") {
      setSubMenuOpen(false);
    }
  }, [inputValue, size]);
  useEffect(() => {
    if (size === "sm") {
      if (!open) {
        setSubMenuOpen(false);
      }
    } else {
      if (open) {
        setActiveItems(undefined);
      }
    }
  }, [open, size]);

  const inputRef = useRef<HTMLInputElement>(null);
  const options = useMemo(
    () =>
      size === "sm"
        ? optionsProp.map((option) => ({
            ...option,
            label: option.subOptions
              ? resolveItemProperty(option.label, { inputValue }).replace(
                  "…",
                  "",
                )
              : resolveItemProperty(option.label, { inputValue }),
          }))
        : (activeItems ?? optionsProp),
    [activeItems, inputValue, optionsProp, size],
  );

  const hasSelectableItem = useMemo(
    () =>
      options.filter((item) => "selected" in item).length > options.length / 2,
    [options],
  );
  const inputDefaultVisibleRef = useRef(hasSelectableItem);
  inputDefaultVisibleRef.current =
    initialInputVisible !== undefined
      ? initialInputVisible
      : hasSelectableItem || false;
  const [inputVisible, setInputVisible] = useState(
    inputDefaultVisibleRef.current,
  );
  useEffect(() => {
    if (inputValue) {
      setInputVisible(true);
    }
  }, [inputValue]);
  useEffect(() => {
    if (open) {
      setInputVisible(inputDefaultVisibleRef.current);
    }
  }, [open]);
  useEffect(() => {
    if (size === "lg") {
      setInputVisible(inputDefaultVisibleRef.current);
    }
  }, [activeItems, size]);

  return (
    <Comp onOpenChange={setOpen} open={open}>
      <MenuProvider
        inputRef={inputRef}
        inputVisible={inputVisible}
        onSelect={(item, { dismiss }) => {
          item.execute?.({ dismiss, inputValue });
          if (typeof openProp === "undefined" && dismiss) {
            setOpen(false);
          }
        }}
        open={open}
        placeholder={placeholder}
        setOpen={setOpen}
        size={size}
      >
        <Command
          inputValue={inputValue}
          onHover={(item) => {
            setSubMenuOpen(!!item.subOptions?.length);
          }}
          onInputValueChange={setInputValue}
          onSelect={(item, { dismiss }) => {
            if (item.subOptions?.length) {
              if (size === "lg") {
                setActiveItems(item.subOptions);
              } else {
                setSubMenuOpen(true);
              }
            } else {
              item.execute?.({ dismiss, inputValue });
              if (typeof openProp === "undefined" && dismiss) {
                setOpen(false);
              }
            }
          }}
          open={open}
          options={options}
          {...props}
        >
          <MenuSubProvider
            inputRef={inputRef}
            open={subMenuOpen}
            setOpen={setSubMenuOpen}
          >
            {children}
          </MenuSubProvider>
        </Command>
      </MenuProvider>
    </Comp>
  );
}

Menu.displayName = "@optiaxiom/react/Menu";
