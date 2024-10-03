import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { Input } from "../input";

type AutocompleteInputProps = ComponentPropsWithRef<typeof Input>;

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ children, ...props }, ref) => {
  const { disabled, downshift } = useAutocompleteContext("AutocompleteInput");
  return (
    <Input
      ref={ref}
      {...props}
      {...downshift.getInputProps({
        disabled,
      })}
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
    >
      {children}
    </Input>
  );
});

AutocompleteInput.displayName = "@optiaxiom/react/AutocompleteInput";
