import { type ComponentPropsWithoutRef, useMemo } from "react";

import type { Command } from "./Command";

import { useEffectEvent } from "../hooks";
import { useSurface } from "../surface";
import {
  buildSurfacePath,
  filterSuggestionsBySurface,
} from "../surface/internals";
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

  const surface = useSurface();
  // Get all suggestions directly from context (not filtered by current path)
  // since we need to check child surface paths
  const suggestions = surface?.suggestions.filter((s) => s.type === "value");

  return useMemo(() => {
    const substring = (inputValue ?? "").normalize();

    // Collect unique property surfaces and their suggested values
    const processedSurfaces = new Set<string>();
    const suggestedValues = new Map<string, unknown>();
    for (const option of options) {
      if (option.surface?.type === "property") {
        const optionSurface = option.surface;
        const key = option.surface.name;
        if (processedSurfaces.has(key)) {
          continue;
        }

        processedSurfaces.add(key);
        filterSuggestionsBySurface(suggestions, surface?.path, [
          {
            name: option.surface.name,
            type: "property",
          },
        ])?.forEach((s) => {
          const path = buildSurfacePath(surface?.path, {
            name: optionSurface.name,
            type: optionSurface.type,
          });
          suggestedValues.set(path, s.value);
        });
      }
    }

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
      // Check if items match suggestions
      const aIsSuggested =
        a.surface?.type === "property" &&
        suggestedValues.get(buildSurfacePath(surface?.path, a.surface)) ===
          a.surface.value;
      const bIsSuggested =
        b.surface?.type === "property" &&
        suggestedValues.get(buildSurfacePath(surface?.path, b.surface)) ===
          b.surface.value;

      // Boost score for suggested items
      const aScore = score(a, substring) + (aIsSuggested ? 1000 : 0);
      const bScore = score(b, substring) + (bIsSuggested ? 1000 : 0);

      return (
        (b.group?.priority ?? 0) + bScore - ((a.group?.priority ?? 0) + aScore)
      );
    });
  }, [options, filterFn, inputValue, suggestions, surface?.path]);
};
