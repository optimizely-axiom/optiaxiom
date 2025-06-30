import { type ComponentPropsWithoutRef, useMemo } from "react";

import type { Command } from "./Command";

import { useEffectEvent } from "../hooks";
import { type CommandOption, resolveItemProperty } from "./CommandContext";
import { fuzzysearch, score } from "./fuzzysearch";

export type useCommandItemsProps = Pick<
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
    return "visible" in item
      ? resolveItemProperty(item.visible, { inputValue })
      : inputValue
        ? fuzzysearch(string, inputValue) ||
          (item.keywords && fuzzysearch(item.keywords, inputValue))
        : true;
  });
  return useMemo(() => {
    const substring = (inputValue ?? "").normalize();
    const callback =
      (parentOption?: CommandOption) =>
      (item: CommandOption): CommandOption[] => {
        return item.subOptions && substring
          ? resolveItemProperty(item.subOptions, { inputValue }).flatMap(
              callback(item),
            )
          : filterFn(item, substring)
            ? [
                parentOption
                  ? {
                      ...item,
                      key: [
                        parentOption.key ??
                          resolveItemProperty(parentOption.label, {
                            inputValue,
                          }),
                        item.key ??
                          resolveItemProperty(item.label, { inputValue }),
                      ].join("-"),
                      parentOption,
                    }
                  : item,
              ]
            : [];
      };
    return options.flatMap(callback()).sort((a, b) => {
      return (
        (b.group?.priority ?? 0) +
        score(b, substring) -
        ((a.group?.priority ?? 0) + score(a, substring))
      );
    });
  }, [options, filterFn, inputValue]);
};
