import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Command } from "../command";
import { DialogContent } from "../dialog-content";
import { DialogTitle } from "../dialog-title";
import { PopoverContent } from "../popover-content";
import { useSpotlightContext } from "../spotlight-context";

type SpotlightContentProps = ComponentPropsWithoutRef<
  typeof DialogContent | typeof PopoverContent
>;

export const SpotlightContent = forwardRef<
  HTMLDivElement,
  SpotlightContentProps
>(({ "aria-label": ariaLabel, children, size: _size, ...props }, ref) => {
  const {
    inputValue,
    isItemDisabled,
    items,
    itemToKey,
    itemToString,
    onInputValueChange,
    onItemSelect,
  } = useSpotlightContext("SpotlightContent");

  return (
    <DialogContent
      aria-describedby={undefined}
      overflow="hidden"
      ref={ref}
      transitionType="pop"
      {...props}
    >
      <VisuallyHidden>
        <DialogTitle>{ariaLabel ?? "Quick search"}</DialogTitle>
      </VisuallyHidden>

      <Command
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToKey={itemToKey}
        itemToString={itemToString}
        onInputValueChange={onInputValueChange}
        onItemSelect={onItemSelect}
      >
        {children}
      </Command>
    </DialogContent>
  );
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
