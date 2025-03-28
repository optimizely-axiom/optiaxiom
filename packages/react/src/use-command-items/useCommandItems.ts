import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";

import { useEffectEvent } from "../use-event";

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  usage: "search",
});

export const useCommandItems = <Item>({
  defaultItems,
  inputValue: inputValueProp,
  items: itemsProp,
  itemToLabel,
  onInputValueChange,
}: {
  defaultItems?: Item[];
  inputValue?: string;
  items?: Item[];
  itemToLabel: (item: Item | null) => string;
  onInputValueChange?: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });

  const [itemsState, setItemsState] = useState(
    defaultItems ? filter(defaultItems, inputValue, itemToLabel) : [],
  );
  const items = typeof itemsProp !== "undefined" ? itemsProp : itemsState;

  return [
    items,
    inputValue,
    useEffectEvent((inputValue: string) => {
      setInputValue(inputValue);
      if (typeof itemsProp === "undefined" && defaultItems) {
        setItemsState(filter(defaultItems, inputValue, itemToLabel));
      }
    }),
  ] as const;
};

const filter = <Item>(
  items: Item[],
  inputValue: string | undefined,
  itemToLabel: (item: Item) => string,
) => {
  const substring = (inputValue ?? "").normalize("NFC");
  return inputValue
    ? items.filter((item) => {
        const string = itemToLabel(item).normalize("NFC");

        for (let i = 0; i + substring.length <= string.length; i++) {
          const slice = string.slice(i, i + substring.length);
          if (collator.compare(substring, slice) === 0) {
            return true;
          }
        }

        return false;
      })
    : items;
};
