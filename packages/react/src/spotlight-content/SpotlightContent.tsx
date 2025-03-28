import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Command } from "../command";
import { CommandListbox } from "../command-listbox";
import { DialogContent } from "../dialog-content";
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
    itemToLabel,
    itemToSubItems,
    onInputValueChange,
    onItemSelect,
  } = useSpotlightContext("@optiaxiom/react/SpotlightContent");

  return (
    <DialogContent
      gap="0"
      overflow="hidden"
      pb="24"
      ref={ref}
      transitionType="pop"
      {...props}
    >
      <VisuallyHidden>
        <RadixDialog.Title>{ariaLabel ?? "Quick search"}</RadixDialog.Title>
      </VisuallyHidden>

      <Command
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        items={items}
        itemToLabel={itemToLabel}
        itemToSubItems={itemToSubItems}
        onInputValueChange={onInputValueChange}
        onItemSelect={onItemSelect}
      >
        <CommandListbox>{children}</CommandListbox>
      </Command>
    </DialogContent>
  );
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
