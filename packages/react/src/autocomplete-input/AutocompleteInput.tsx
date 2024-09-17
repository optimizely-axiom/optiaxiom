import { ComboboxInput } from "@headlessui/react";
import { forwardRef } from "react";

import type { InputBaseProps } from "../input-base";

import { SearchInput } from "../search-input";
import { extractSprinkles } from "../sprinkles";

type AutocompleteInputProps = InputBaseProps<typeof ComboboxInput>;

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <SearchInput asChild ref={ref} {...sprinkleProps}>
      <ComboboxInput {...restProps} />
    </SearchInput>
  );
});

AutocompleteInput.displayName = "@optiaxiom/react/AutocompleteInput";
