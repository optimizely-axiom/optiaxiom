import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Checkbox } from "../checkbox";
import { useCommandContext } from "../command-context";
import { CommandItem } from "../command-item";
import { Flex } from "../flex";

type CommandCheckboxItemProps = ComponentPropsWithoutRef<typeof CommandItem>;

export const CommandCheckboxItem = forwardRef<
  HTMLLIElement,
  CommandCheckboxItemProps
>(({ addonBefore, ...props }, ref) => {
  const { isItemDisabled, items, value } = useCommandContext(
    "CommandCheckboxItem",
  );

  return (
    <CommandItem
      addonBefore={
        <Flex flexDirection="row" gap="xs">
          <Checkbox
            checked={props.active ?? value?.has(props.item)}
            disabled={isItemDisabled(props.item, items.indexOf(props.item))}
            tabIndex={-1}
          />
          {addonBefore}
        </Flex>
      }
      ref={ref}
      {...props}
    />
  );
});

CommandCheckboxItem.displayName = "@optiaxiom/react/CommandCheckboxItem";
