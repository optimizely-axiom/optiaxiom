import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { useEffectEvent } from "../hooks";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";
import { Input } from "../input";
import { useCommandContext } from "./CommandContext";

export type CommandInputProps = ComponentPropsWithoutRef<typeof Input>;

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ onBlur, onKeyDown, size, ...props }, ref) => {
    const { downshift, highlightedItem, highlightedItemRef, setInputValue } =
      useCommandContext("@optiaxiom/react/CommandInput");
    const setInputValueStable = useEffectEvent(setInputValue);
    useEffect(() => {
      setInputValueStable("");
    }, [setInputValueStable]);

    const preventDownshiftBlurRef = useRef(false);

    return (
      <Input
        addonBefore={<IconMagnifyingGlass />}
        htmlSize={1}
        size={size}
        {...downshift.getInputProps({
          "aria-label": props.placeholder,
          ref,
          ...props,
          onBlur: (event) => {
            onBlur?.(event);
            if (event.defaultPrevented) {
              return;
            }

            if (preventDownshiftBlurRef.current) {
              Object.assign(event, { preventDownshiftDefault: true });
              preventDownshiftBlurRef.current = false;
            }
          },
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
            if (!highlightedItem) {
              return;
            }

            if (!event.target.value && event.key === " ") {
              event.preventDefault();
              downshift.selectItem(highlightedItem);
            } else if (event.key === "Enter") {
              if (highlightedItemRef.current instanceof HTMLAnchorElement) {
                const { view: _view, ...eventInit } = event;

                event.preventDefault();
                Object.assign(event, { preventDownshiftDefault: true });
                preventDownshiftBlurRef.current = true;

                highlightedItemRef.current.dispatchEvent(
                  new MouseEvent("click", eventInit),
                );
              }
            }
          },
        })}
      />
    );
  },
);

CommandInput.displayName = "@optiaxiom/react/CommandInput";
