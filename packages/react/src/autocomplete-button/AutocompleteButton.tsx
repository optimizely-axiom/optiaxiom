import { ComboboxButton } from "@headlessui/react";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type AutocompleteButtonProps = ButtonProps<typeof ComboboxButton>;

export const AutocompleteButton = forwardRef<
  HTMLButtonElement,
  AutocompleteButtonProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Button asChild ref={ref} {...sprinkleProps}>
      <ComboboxButton {...restProps}>{children}</ComboboxButton>
    </Button>
  );
});

AutocompleteButton.displayName = "@optiaxiom/react/AutocompleteButton";
