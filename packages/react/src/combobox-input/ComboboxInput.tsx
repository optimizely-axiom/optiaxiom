import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useComboboxContext } from "../combobox-context";
import { Input } from "../input";
import { extractSprinkles } from "../sprinkles";

type ComboboxInputProps = ComponentPropsWithoutRef<typeof Input>;

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  (props, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, setInputValue } = useComboboxContext("ComboboxInput");

    return (
      <Input
        m="4"
        {...sprinkleProps}
        {...downshift.getInputProps({
          ...restProps,
          onChange: (event) => {
            setInputValue("value" in event.target ? event.target.value : "");
          },
          ref,
        })}
      />
    );
  },
);

ComboboxInput.displayName = "@optiaxiom/react/ComboboxInput";
