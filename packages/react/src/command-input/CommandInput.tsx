import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ size, ...props }, ref) => {
    const { downshift, setInputValue } = useCommandContext(
      "@optiaxiom/react/CommandInput",
    );

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        size={size}
        {...downshift.getInputProps({
          ref,
          ...props,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
