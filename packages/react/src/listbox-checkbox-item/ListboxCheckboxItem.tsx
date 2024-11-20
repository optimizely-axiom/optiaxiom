import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Checkbox } from "../checkbox";
import { Flex } from "../flex";
import { ListboxItem } from "../listbox-item";

type ListboxCheckboxItemProps = ComponentPropsWithoutRef<typeof ListboxItem>;

export const ListboxCheckboxItem = forwardRef<
  HTMLDivElement,
  ListboxCheckboxItemProps
>(({ addonBefore, ...props }, ref) => {
  return (
    <ListboxItem
      addonBefore={
        <Flex flexDirection="row" gap="xs">
          <Checkbox
            checked={Boolean(props["aria-selected"])}
            disabled={Boolean(props["aria-disabled"])}
            pointerEvents="none"
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

ListboxCheckboxItem.displayName = "@optiaxiom/react/ListboxCheckboxItem";