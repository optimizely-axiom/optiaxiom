import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { type BoxProps } from "../box";
import { Field } from "../field";
type AccordionItemProps = BoxProps<typeof Field>;

export const AutocompleteLabel = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, ref) => {
    const { downshift } = useAutocompleteContext("AutocompleteLabel");
    return (
      <Field ref={ref} {...props} id={downshift.getLabelProps()["htmlFor"]}>
        {children}
      </Field>
    );
  },
);

AutocompleteLabel.displayName = "@optiaxiom/react/AutocompleteLabel";
