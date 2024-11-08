import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandInput } from "../command-input";

type ComboboxInputProps = ComponentPropsWithoutRef<typeof CommandInput>;

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, ref) => {
    const { downshift, highlightedItem } = useCommandContext("ComboboxInput");

    return (
      <CommandInput
        m="4"
        onKeyDown={(event) => {
          if (event.key === " " && highlightedItem) {
            event.preventDefault();
            downshift.selectItem(highlightedItem);
          }
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

ComboboxInput.displayName = "@optiaxiom/react/ComboboxInput";
