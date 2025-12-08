import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Group } from "../group";
import { ListboxItem } from "./ListboxItem";
import { ListboxItemIndicator } from "./ListboxItemIndicator";

export type ListboxRadioItemProps = ComponentPropsWithoutRef<
  typeof ListboxItem
>;

/**
 * @group Listbox
 */
export const ListboxRadioItem = forwardRef<
  HTMLDivElement,
  ListboxRadioItemProps
>(({ addonAfter, ...props }, ref) => {
  return (
    <ListboxItem
      addonAfter={
        <Group gap="8">
          {addonAfter}
          <ListboxItemIndicator
            active={Boolean(
              props[
                props["role"] === "option" ? "aria-selected" : "aria-checked"
              ],
            )}
          />
        </Group>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxRadioItem.displayName = "@optiaxiom/react/ListboxRadioItem";
