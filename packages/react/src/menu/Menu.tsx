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
import { type CommandOption, resolveItemProperty } from "../command-context";
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
  "onSelect"
>;

export function Menu({
  children,
  defaultInputVisible,
  defaultOpen = false,
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
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });

  const [activePath, setActivePath] = useState<number[]>([]);
  useEffect(() => {
    if (inputValue && size === "sm") {
      setActivePath((path) => (path.length ? [] : path));
    }
  }, [inputValue, size]);
  useEffect(() => {
    if (size === "sm") {
      if (!open) {
        setActivePath((path) => (path.length ? [] : path));
      }
    } else {
      if (open) {
        setActivePath((path) => (path.length ? [] : path));
      }
    }
  }, [open, size]);

  const inputRef = useRef<HTMLInputElement>(null);
  const options = useMemo(
    () =>
      activePath.length && size === "lg"
        ? (optionsProp[activePath[0]].subOptions ?? [])
        : size === "sm"
          ? optionsProp.map((option) => ({
              ...option,
              label: option.subOptions
                ? resolveItemProperty(option.label, { inputValue }).replace(
                    "…",
                    "",
                  )
                : resolveItemProperty(option.label, { inputValue }),
            }))
          : optionsProp,
    [activePath, inputValue, optionsProp, size],
  );

  const hasSelectableItem = useMemo(
    () => options.some((item) => "selected" in item),
    [options],
  );
  const inputDefaultVisibleRef = useRef(hasSelectableItem);
  inputDefaultVisibleRef.current =
    hasSelectableItem || defaultInputVisible || false;
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
  }, [activePath, open]);

  return (
    <Comp onOpenChange={setOpen} open={open}>
      <MenuProvider
        activePath={activePath}
        inputRef={inputRef}
        inputVisible={inputVisible}
        onSelect={(item, { close }) => {
          item.execute?.({ inputValue });
          if (typeof openProp === "undefined" && close) {
            setOpen(false);
          }
        }}
        open={open}
        placeholder={placeholder}
        setActivePath={setActivePath}
        setOpen={setOpen}
        size={size}
      >
        <Command
          inputValue={inputValue}
          onHover={(item) => {
            if (item.subOptions?.length) {
              const index = options.indexOf(item);
              setActivePath((path) => (!path.includes(index) ? [index] : path));
            } else {
              setActivePath((path) => (path.length ? [] : path));
            }
          }}
          onInputValueChange={setInputValue}
          onSelect={(item, { close }) => {
            if (item.subOptions?.length) {
              const index = options.indexOf(item);
              setActivePath((path) => (!path.includes(index) ? [index] : path));
            } else {
              item.execute?.({ inputValue });
              if (typeof openProp === "undefined" && close) {
                setOpen(false);
              }
            }
          }}
          options={options}
          {...props}
        >
          {children}
        </Command>
      </MenuProvider>
    </Comp>
  );
}

Menu.displayName = "@optiaxiom/react/Menu";
