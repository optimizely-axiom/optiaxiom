import { PopperAnchor } from "@radix-ui/react-popper";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type AutocompleteTriggerProps = ComponentPropsWithRef<typeof Input>;

export const AutocompleteTrigger = forwardRef<
  HTMLInputElement,
  AutocompleteTriggerProps
>(({ ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { disabled, downshift, setInputValue } =
    useAutocompleteContext("AutocompleteInput");

  return (
    <PopperAnchor>
      <Input
        addonAfter={
          <Flex flexDirection="row" gap="0">
            {downshift.selectedItem && (
              <Button
                appearance="subtle"
                aria-label="Clear"
                icon={<IconX />}
                onClick={() => downshift.reset()}
                size="sm"
                tabIndex={-1}
              />
            )}
            <Button
              appearance="subtle"
              aria-label="Toggle"
              icon={<IconAngleDown />}
              size="sm"
              tabIndex={-1}
              {...downshift.getToggleButtonProps()}
            />
          </Flex>
        }
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
          disabled,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          ref,
        })}
      />
    </PopperAnchor>
  );
});

AutocompleteTrigger.displayName = "@optiaxiom/react/AutocompleteTrigger";
