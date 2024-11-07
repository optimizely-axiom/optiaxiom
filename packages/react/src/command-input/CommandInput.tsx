import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  (props, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, highlightedItem, setInputValue } =
      useCommandContext("CommandInput");

    return (
      <Input
        m="4"
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          onKeyDown: (event) => {
            if (event.key === " " && highlightedItem) {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            }
          },
          ref,
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
