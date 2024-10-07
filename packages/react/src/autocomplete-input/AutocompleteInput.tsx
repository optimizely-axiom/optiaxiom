import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type AutocompleteInputProps = ComponentPropsWithRef<typeof Input>;

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { disabled, downshift, setInputValue } =
    useAutocompleteContext("AutocompleteInput");

  return (
    <Input
      addonAfter={
        downshift.inputValue &&
        !disabled && (
          <Button
            appearance="subtle"
            aria-label="clear"
            icon={downshift.inputValue && <IconX />}
            onClick={() => {
              downshift.reset();
            }}
            rounded="full"
            size="sm"
          />
        )
      }
      ref={ref}
      {...sprinkleProps}
      {...downshift.getInputProps({
        ...restProps,
        disabled,
        onChange: (event) =>
          setInputValue("value" in event.target ? event.target.value : ""),
      })}
    >
      {children}
    </Input>
  );
});

AutocompleteInput.displayName = "@optiaxiom/react/AutocompleteInput";
