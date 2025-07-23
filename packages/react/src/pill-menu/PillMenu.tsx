import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useMemo,
  useState,
} from "react";

import type { BoxProps } from "../box";

import { resolveItemProperty } from "../command/CommandContext";
import { Menu, type MenuOption } from "../menu";
import { PillMenuProvider } from "./PillMenuContext";
import { PillMenuImpl } from "./PillMenuImpl";

export type PillMenuProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof Menu>,
    | "defaultOpen"
    | "empty"
    | "inputValue"
    | "inputVisible"
    | "loading"
    | "onInputValueChange"
    | "onOpenChange"
    | "open"
    | "options"
    | "placeholder"
  >
>;

export const PillMenu = forwardRef<HTMLDivElement, PillMenuProps>(
  (
    {
      children,
      defaultOpen = false,
      empty,
      inputValue,
      inputVisible,
      loading,
      onInputValueChange,
      onOpenChange,
      open: openProp,
      options,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useControllableState({
      caller: "@optiaxiom/react/PillMenu",
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: openProp,
    });
    const [optionIndexes, setOptionIndexes] = useState(() =>
      groupOptions(options),
    );

    return (
      <PillMenuProvider
        options={options.filter((item) => resolveItemProperty(item.selected))}
      >
        <Menu
          empty={empty}
          inputValue={inputValue}
          inputVisible={inputVisible}
          loading={loading}
          onInputValueChange={onInputValueChange}
          onOpenChange={(open) => {
            setOpen(open);
            if (open) {
              setOptionIndexes(groupOptions(options));
            }
          }}
          open={open}
          options={useMemo(
            () =>
              optionIndexes.map<MenuOption>(({ group, index }) => ({
                ...options[index],
                ...(group && {
                  group: {
                    hidden: true,
                    label: group,
                    separator: true,
                  },
                }),
              })),
            [optionIndexes, options],
          )}
          placeholder={placeholder}
        >
          <PillMenuImpl ref={ref} {...props}>
            {children}
          </PillMenuImpl>
        </Menu>
      </PillMenuProvider>
    );
  },
);

PillMenu.displayName = "@optiaxiom/react/PillMenu";

const groupOptions = (
  options: ComponentPropsWithoutRef<typeof Menu>["options"],
) =>
  options
    .map((option, index) => ({
      index,
      option,
    }))
    .sort(({ index: aIndex, option: a }, { index: bIndex, option: b }) => {
      if (resolveItemProperty(a.selected) === resolveItemProperty(b.selected)) {
        return aIndex - bIndex;
      } else if (resolveItemProperty(a.selected)) {
        return -1;
      } else {
        return 1;
      }
    })
    .map(({ index, option }) => ({
      group: resolveItemProperty(option.selected) ? "selected" : undefined,
      index,
    }));
