import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";
import { useCommandContext } from "./CommandContext";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onKeyDown, size, ...props }, ref) => {
    const { downshift, highlightedItem, setInputValue } = useCommandContext(
      "@optiaxiom/react/CommandInput",
    );

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        htmlSize={1}
        size={size}
        {...downshift.getInputProps({
          ref,
          ...props,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          onKeyDown: (event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) {
              return;
            }

            if (!(event.target instanceof HTMLInputElement)) {
              return;
            }
            if (event.target.value) {
              return;
            }
            if (!highlightedItem) {
              return;
            }

            const subOptions = highlightedItem.subOptions;
            if (event.key === " ") {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            } else if (event.key === "ArrowRight" && subOptions?.length) {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            }
          },
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
