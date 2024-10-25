import { PopperAnchor } from "@radix-ui/react-popper";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { Separator } from "../separator";
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
          <Flex
            alignItems="stretch"
            alignSelf="stretch"
            flexDirection="row"
            gap="0"
            mr="0"
          >
            {downshift.selectedItem && (
              <Flex onClick={() => downshift.reset()} w="32">
                <Icon asChild>
                  <IconX aria-hidden focusable={false} />
                </Icon>
              </Flex>
            )}

            <Separator my="xs" orientation="vertical" />

            <Flex onClick={downshift.getToggleButtonProps().onClick} w="32">
              <Icon asChild>
                <IconAngleDown aria-hidden focusable={false} />
              </Icon>
            </Flex>
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
