import { useDebouncedCallback } from "@mantine/hooks";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useMemo,
  useState,
} from "react";

import { Box, type BoxProps } from "../box";
import { resolveItemProperty } from "../command/CommandContext";
import { Menu, type MenuOption } from "../menu";
import { PillMenuProvider } from "./PillMenuContext";

const EMPTY_LIST: unknown[] = [];

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
    | "placeholder"
  > & {
    /**
     * The candidate options shown in the popup. Defaults to `value` when omitted.
     */
    options?: MenuOption[];
    /**
     * The currently selected options rendered as pills in the trigger.
     */
    value: MenuOption[];
  }
>;

/**
 * Dropdown menu for making selection with pills showing the selected items.
 *
 * @since 1.6.2
 * @experimental
 * @category data-display
 * @category overlay

 */
export const PillMenu = forwardRef<HTMLDivElement, PillMenuProps>(
  (
    {
      children,
      defaultOpen = false,
      empty,
      inputValue,
      inputVisible = "always",
      loading,
      onInputValueChange,
      onOpenChange,
      open: openProp,
      options: optionsProp,
      placeholder,
      value: valueProp,
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
    const debouncedOnInputValueChange = useDebouncedCallback(
      (value: string) => onInputValueChange?.(value),
      300,
    );
    const options = optionsProp ?? valueProp ?? EMPTY_LIST;
    const value =
      valueProp ??
      (optionsProp
        ? optionsProp.filter((item) => resolveItemProperty(item.selected))
        : EMPTY_LIST);
    const [selectedKeys, setSelectedKeys] = useState(() =>
      collectSelectedKeys(value),
    );
    const optionIndexes = useMemo(
      () => groupOptions(options, selectedKeys),
      [options, selectedKeys],
    );

    return (
      <PillMenuProvider value={value}>
        <Menu
          empty={empty}
          inputValue={inputValue}
          inputVisible={inputVisible}
          loading={loading}
          onInputValueChange={debouncedOnInputValueChange}
          onOpenChange={(open) => {
            setOpen(open);
            if (open) {
              setSelectedKeys(collectSelectedKeys(value));
            }
          }}
          open={open}
          options={useMemo(
            () =>
              optionIndexes.map<MenuOption>(({ group, index }) => ({
                ...(optionsProp ?? valueProp ?? EMPTY_LIST)[index],
                ...(group && {
                  group: {
                    hidden: true,
                    label: group,
                    priority: 1000,
                    separator: true,
                  },
                }),
              })),
            [optionIndexes, optionsProp, valueProp],
          )}
          placeholder={placeholder}
        >
          <Box
            alignItems={value.length ? undefined : "start"}
            display="flex"
            flexDirection="column"
            ref={ref}
            {...props}
          >
            {children}
          </Box>
        </Menu>
      </PillMenuProvider>
    );
  },
);

PillMenu.displayName = "@optiaxiom/react/PillMenu";

const optionKey = (option: MenuOption) =>
  option.key ?? resolveItemProperty(option.label, { inputValue: undefined });

const collectSelectedKeys = (
  options: ComponentPropsWithoutRef<typeof Menu>["options"],
) => new Set(options.map(optionKey));

const groupOptions = (
  options: ComponentPropsWithoutRef<typeof Menu>["options"],
  selectedKeys: Set<string>,
) =>
  options
    .map((option, index) => ({
      index,
      option,
      selected: selectedKeys.has(optionKey(option)),
    }))
    .sort(
      (
        { index: aIndex, selected: aSel },
        { index: bIndex, selected: bSel },
      ) => {
        if (aSel === bSel) {
          return aIndex - bIndex;
        } else if (aSel) {
          return -1;
        } else {
          return 1;
        }
      },
    )
    .map(({ index, selected }) => ({
      group: selected ? "selected" : undefined,
      index,
    }));
