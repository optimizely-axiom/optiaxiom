import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  (props, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, setInputValue } = useCommandContext("CommandInput");

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          ref,
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
