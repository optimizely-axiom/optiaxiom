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
      /**
       * Whether to always show the input or only if there are selectable options and/or when user starts to type.
       */
      inputVisible?: "always" | "if-needed";
      /**
       * Handler that is called when the open state changes.
       */
      onOpenChange?: (open: boolean) => void;
      /**
       * The open state in controlled mode.
       */
      open?: boolean;
      /**
       * The placeholder for the search input.
       */
      placeholder?: string;
      /**
       * Whether to show a small popover or a dialog. Defaults to popover on large screens and dialog on mobile screens.
       */
      size?: "lg" | "sm";
    }
  >,
  "onSelect"
>;

export function Menu({
  children,
  defaultOpen = false,
  inputValue: inputValueProp,
  inputVisible: inputVisibleProp,
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

  const [activeItemStack, setActiveItemStack] = useState<CommandOption[]>([]);
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
        setActiveItemStack((activeItemStack) =>
          activeItemStack.length ? [] : activeItemStack,
        );
      }
    }
  }, [open, size]);

  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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
        : activeItemStack.length
          ? activeItemStack.reduce((result, stackItem) => {
              const stackKey =
                stackItem.key ??
                resolveItemProperty(stackItem.label, { inputValue });
              for (const resultItem of result) {
                const resultKey =
                  resultItem.key ??
                  resolveItemProperty(resultItem.label, { inputValue });
                if (resultKey === stackKey) {
                  return (
                    resolveItemProperty(resultItem.subOptions, {
                      inputValue,
                    }) ?? []
                  );
                }
              }
              throw new Error(`Could not find item: ${stackKey}`);
            }, optionsProp)
          : optionsProp,
    [activeItemStack, inputValue, optionsProp, size],
  );

  const hasSelectableItem = useMemo(
    () =>
      options.filter((item) => "selected" in item).length > options.length / 2,
    [options],
  );
  const inputDefaultVisibleRef = useRef(hasSelectableItem);
  inputDefaultVisibleRef.current =
    inputVisibleProp === "always" ? true : hasSelectableItem || false;
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
  }, [activeItemStack, size]);

  return (
    <Comp onOpenChange={setOpen} open={open}>
      <MenuProvider
        activeItemStack={activeItemStack}
        inputRef={inputRef}
        inputVisible={inputVisible}
        onSelect={(item, { dismiss }) => {
          item.execute?.({ dismiss, inputValue });
          if (typeof openProp === "undefined" && dismiss) {
            setOpen(false);
          }
        }}
        open={open}
        placeholder={
          activeItemStack.length
            ? resolveItemProperty(
                activeItemStack[activeItemStack.length - 1].label,
                { inputValue },
              )
            : placeholder
        }
        setActiveItemStack={setActiveItemStack}
        setOpen={setOpen}
        size={size}
        triggerRef={triggerRef}
      >
        <Command
          enabled={open ? activeItemStack.length + 1 : false}
          inputValue={inputValue}
          onHover={(item, pointer) => {
            setSubMenuOpen(
              pointer &&
                (typeof item.subOptions === "function" ||
                  !!item.subOptions?.length),
            );
          }}
          onInputValueChange={setInputValue}
          onSelect={(item, { dismiss }) => {
            if (
              typeof item.subOptions === "function" ||
              item.subOptions?.length
            ) {
              if (size === "lg") {
                setActiveItemStack((stack) => [...(stack ?? []), item]);
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
          options={options}
          {...props}
        >
          <MenuSubProvider
            contentRef={contentRef}
            inputRef={inputRef}
            itemRef={itemRef}
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
