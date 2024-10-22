import { PopperAnchor } from "@radix-ui/react-popper";
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
    <PopperAnchor>
      <SearchInput
        addonBefore={null}
        {...(!downshift.selectedItem && { addonAfter: null })}
        onValueClear={() => downshift.reset()}
        ref={ref}
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
          disabled,
          onChange: (event) =>
            setInputValue("value" in event.target ? event.target.value : ""),
        })}
      />
    </PopperAnchor>
  );
});

AutocompleteTrigger.displayName = "@optiaxiom/react/AutocompleteTrigger";
