import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandInput } from "../command-input";
import { useDropdownMenuAutocompleteContext } from "../dropdown-menu-autocomplete-context";

type DropdownMenuAutocompleteInputProps = ComponentPropsWithoutRef<
  typeof CommandInput
>;

export const DropdownMenuAutocompleteInput = forwardRef<
  HTMLInputElement,
  DropdownMenuAutocompleteInputProps
>((props, outerRef) => {
  const { downshift, highlightedItem } = useCommandContext(
    "@optiaxiom/react/DropdownMenuAutocompleteInput",
  );
  const { inputRef } = useDropdownMenuAutocompleteContext(
    "@optiaxiom/react/DropdownMenuAutocompleteInput",
  );
  const ref = useComposedRefs(inputRef, outerRef);

  return (
    <CommandInput
      htmlSize={10}
      m="4"
      onKeyDown={(event) => {
        if (!(event.target instanceof HTMLInputElement)) {
          return;
        }
        if (event.key === " " && !event.target.value) {
          event.preventDefault();
          downshift.selectItem(highlightedItem);
        }
      }}
      ref={ref}
      {...props}
    />
  );
});

DropdownMenuAutocompleteInput.displayName =
  "@optiaxiom/react/DropdownMenuAutocompleteInput";
