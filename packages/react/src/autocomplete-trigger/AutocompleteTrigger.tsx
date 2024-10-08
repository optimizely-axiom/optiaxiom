import { PopoverAnchor, PopoverTrigger } from "@radix-ui/react-popover";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { SearchInput } from "../search-input";
import { extractSprinkles } from "../sprinkles";

type AutocompleteTriggerProps = ComponentPropsWithRef<typeof SearchInput>;

export const AutocompleteTrigger = forwardRef<
  HTMLInputElement,
  AutocompleteTriggerProps
>(({ ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { disabled, downshift, setInputValue } =
    useAutocompleteContext("AutocompleteInput");

  return (
    // https://github.com/radix-ui/primitives/issues/1461
    <PopoverAnchor>
      <PopoverTrigger asChild type={undefined} {...sprinkleProps}>
        <SearchInput
          addonBefore={null}
          onValueClear={() => downshift.reset()}
          ref={ref}
          {...downshift.getInputProps({
            ...restProps,
            disabled,
            onChange: (event) =>
              setInputValue("value" in event.target ? event.target.value : ""),
          })}
        />
      </PopoverTrigger>
    </PopoverAnchor>
  );
});

AutocompleteTrigger.displayName = "@optiaxiom/react/AutocompleteTrigger";
