import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Flex } from "../flex";
import { ListboxItem } from "../listbox-item";
import { ListboxItemIndicator } from "../listbox-item-indicator";

type ListboxRadioItemProps = ComponentPropsWithoutRef<typeof ListboxItem>;

export const ListboxRadioItem = forwardRef<
  HTMLDivElement,
  ListboxRadioItemProps
>(({ addonAfter, ...props }, ref) => {
  return (
    <ListboxItem
      addonAfter={
        <Flex flexDirection="row" gap="8">
          {addonAfter}
          <ListboxItemIndicator active={Boolean(props["aria-selected"])} />
        </Flex>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxRadioItem.displayName = "@optiaxiom/react/ListboxRadioItem";
