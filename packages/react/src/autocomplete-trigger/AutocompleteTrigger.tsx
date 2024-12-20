import { PopperAnchor } from "@radix-ui/react-popper";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { CommandInput } from "../command-input";
import { CommandToggleButton } from "../command-toggle-button";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { Separator } from "../separator";

type AutocompleteTriggerProps = ComponentPropsWithRef<typeof Input>;

export const AutocompleteTrigger = forwardRef<
  HTMLInputElement,
  AutocompleteTriggerProps
>((props, ref) => {
  const { disabled, selectedItem, setSelectedItem } =
    useAutocompleteContext("AutocompleteInput");

  return (
    <PopperAnchor>
      <CommandInput
        addonAfter={
          <Flex
            alignItems="stretch"
            alignSelf="stretch"
            flexDirection="row"
            gap="0"
          >
            {selectedItem && (
              <Flex
                cursor={disabled ? "default" : "pointer"}
                onClick={() => setSelectedItem(null)}
                w="md"
              >
                <Icon asChild>
                  <IconX aria-hidden focusable={false} />
                </Icon>
              </Flex>
            )}

            <Separator my="8" orientation="vertical" />

            <Flex asChild w="md">
              <CommandToggleButton aria-label="Toggle" disabled={disabled}>
                <Icon asChild>
                  <IconAngleDown aria-hidden focusable={false} />
                </Icon>
              </CommandToggleButton>
            </Flex>
          </Flex>
        }
        addonBefore={null}
        disabled={disabled}
        pr="0"
        ref={ref}
        {...props}
      />
    </PopperAnchor>
  );
});

AutocompleteTrigger.displayName = "@optiaxiom/react/AutocompleteTrigger";
