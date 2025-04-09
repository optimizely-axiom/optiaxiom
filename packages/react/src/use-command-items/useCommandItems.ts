import { type ComponentPropsWithoutRef, useMemo } from "react";

import type { Command } from "../command";

import { type CommandOption, resolveItemProperty } from "../command-context";
import { useEffectEvent } from "../use-event";
import { fuzzysearch } from "./fuzzysearch";

type useCommandItemsProps = Pick<
  ComponentPropsWithoutRef<typeof Command>,
  "inputValue" | "items"
>;

export const useCommandItems = ({
  inputValue,
  items: itemsProp,
}: useCommandItemsProps) => {
  const filterFn = useEffectEvent((item: CommandOption, inputValue: string) => {
    const string = resolveItemProperty(item.label, {
      inputValue,
    }).normalize();
    return item.visible
      ? resolveItemProperty(item.visible, { inputValue })
      : inputValue
        ? fuzzysearch(string, inputValue) ||
          (item.keywords && fuzzysearch(item.keywords, inputValue))
        : true;
  });
  return useMemo(() => {
    const substring = (inputValue ?? "").normalize();
    return itemsProp.flatMap((item) => {
      if (item.subItems && substring) {
        return item.subItems
          .filter((item) => filterFn(item, substring))
          .map((subItem) => ({
            ...subItem,
            parentItem: item,
          }));
      } else {
        return filterFn(item, substring) ? [item] : [];
      }
    });
  }, [itemsProp, filterFn, inputValue]);
};
