import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteListContext } from "../autocomplete-list-context";
import { IconCheck } from "../icons/IconCheck";

type AutocompleteItemIndicatorProps = ComponentPropsWithRef<typeof IconCheck>;

export const AutocompleteItemIndicator = forwardRef<
  SVGSVGElement,
  AutocompleteItemIndicatorProps
>(({ ...props }, ref) => {
  const { active } = useAutocompleteListContext("AutocompleteItemIndicator");
  if (!active) {
    return null;
  }

  return <IconCheck ref={ref} {...props} />;
});

AutocompleteItemIndicator.displayName =
  "@optiaxiom/react/AutocompleteItemIndicator";
