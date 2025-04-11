import { type ComponentPropsWithoutRef, useMemo } from "react";

import type { Command } from "../command";

import { type CommandOption, resolveItemProperty } from "../command-context";
import { useEffectEvent } from "../use-event";
import { fuzzysearch } from "./fuzzysearch";

type useCommandItemsProps = Pick<
  ComponentPropsWithoutRef<typeof Command>,
  "inputValue" | "options"
>;

export const useCommandItems = ({
  inputValue,
  options,
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
    return options.flatMap((item) => {
      if (item.subOptions && substring) {
        return item.subOptions
          .filter((item) => filterFn(item, substring))
          .map<CommandOption>((subItem) => ({
            ...subItem,
            parentOption: item,
          }));
      } else {
        return filterFn(item, substring) ? [item] : [];
      }
    });
  }, [options, filterFn, inputValue]);
};
