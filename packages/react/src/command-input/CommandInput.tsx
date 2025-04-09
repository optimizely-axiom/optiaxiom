import { type ComponentPropsWithoutRef, forwardRef, useEffect } from "react";

import { useCommandContext } from "../command-context";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";

type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ size, ...props }, ref) => {
    const { downshift, setInputValue } = useCommandContext(
      "@optiaxiom/react/CommandInput",
    );
    useEffect(() => {
      setInputValue("");
    }, [setInputValue]);

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        size={size}
        {...downshift.getInputProps({
          ...props,
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
