import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useState } from "react";

import type { Command } from "../command";

import { useEffectEvent } from "../use-event";

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  usage: "search",
});

type useCommandItemsProps<Item> = Pick<
  ComponentPropsWithoutRef<typeof Command<Item>>,
  | "defaultFilter"
  | "defaultItems"
  | "inputValue"
  | "items"
  | "onInputValueChange"
> &
  Required<Pick<ComponentPropsWithoutRef<typeof Command<Item>>, "itemToLabel">>;

export const useCommandItems = <Item>({
  defaultFilter,
  defaultItems,
  inputValue: inputValueProp,
  items: itemsProp,
  itemToLabel,
  onInputValueChange,
}: useCommandItemsProps<Item>) => {
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });

  const filterFn = useEffectEvent(
    defaultFilter ??
      ((item: Item, inputValue: string) => {
        const string = itemToLabel(item).normalize("NFC");

        for (let i = 0; i + inputValue.length <= string.length; i++) {
          const slice = string.slice(i, i + inputValue.length);
          if (collator.compare(inputValue, slice) === 0) {
            return true;
          }
        }

        return false;
      }),
  );
  const [itemsState, setItemsState] = useState(
    defaultItems ? filter(defaultItems, inputValue, filterFn) : [],
  );
  const items = typeof itemsProp !== "undefined" ? itemsProp : itemsState;

  return [
    items,
    inputValue,
    useEffectEvent((inputValue: string) => {
      setInputValue(inputValue);
      if (typeof itemsProp === "undefined" && defaultItems) {
        setItemsState(filter(defaultItems, inputValue, filterFn));
      }
    }),
  ] as const;
};

const filter = <Item>(
  items: Item[],
  inputValue: string | undefined,
  filterFn: (item: Item, inputValue: string) => boolean,
) => {
  const substring = (inputValue ?? "").normalize("NFC");
  return inputValue ? items.filter((item) => filterFn(item, substring)) : items;
};
