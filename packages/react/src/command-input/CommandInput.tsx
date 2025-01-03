import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onKeyDown, size, ...props }, ref) => {
    const {
      downshift,
      highlightedItem,
      highlightedSubIndex,
      itemToSubItems,
      setHighlightedSubIndex,
      setInputValue,
    } = useCommandContext("CommandInput");

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        size={size}
        {...downshift.getInputProps({
          ...props,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          onKeyDown: (event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) {
              return;
            }

            if (
              highlightedItem &&
              highlightedSubIndex !== -1 &&
              (event.key === "ArrowLeft" ||
                event.key === "ArrowRight" ||
                event.key === "Enter")
            ) {
              const subItems = itemToSubItems?.(highlightedItem) ?? [];
              if (subItems.length === 0) {
                return;
              }

              event.preventDefault();
              Object.assign(event.nativeEvent, {
                preventDownshiftDefault: true,
              });
              if (event.key === "ArrowRight") {
                setHighlightedSubIndex(
                  highlightedSubIndex === subItems.length - 1
                    ? 0
                    : highlightedSubIndex + 1,
                  "keyboard",
                );
              } else if (event.key === "ArrowLeft") {
                setHighlightedSubIndex(
                  highlightedSubIndex === 0
                    ? subItems.length - 1
                    : highlightedSubIndex - 1,
                  "keyboard",
                );
              } else if (event.key === "Enter") {
                downshift.selectItem(subItems[highlightedSubIndex]);
              }
            }
          },
          ref,
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
