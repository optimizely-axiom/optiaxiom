import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onKeyDown, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
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
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
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
              event.preventDefault();
              Object.assign(event.nativeEvent, {
                preventDownshiftDefault: true,
              });
              const subItems = itemToSubItems?.(highlightedItem) ?? [];
              if (event.key === "ArrowRight") {
                setHighlightedSubIndex(
                  highlightedSubIndex === subItems.length - 1
                    ? 0
                    : highlightedSubIndex + 1,
                );
              } else if (event.key === "ArrowLeft") {
                setHighlightedSubIndex(
                  highlightedSubIndex === 0
                    ? subItems.length - 1
                    : highlightedSubIndex - 1,
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
