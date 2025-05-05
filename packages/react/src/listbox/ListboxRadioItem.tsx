import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Flex } from "../flex";
import { ListboxItem } from "./ListboxItem";
import { ListboxItemIndicator } from "./ListboxItemIndicator";

export type ListboxRadioItemProps = ComponentPropsWithoutRef<
  typeof ListboxItem
>;

export const ListboxRadioItem = forwardRef<
  HTMLDivElement,
  ListboxRadioItemProps
>(({ addonAfter, ...props }, ref) => {
  return (
    <ListboxItem
      addonAfter={
        <Flex flexDirection="row" gap="8">
          {addonAfter}
          <ListboxItemIndicator
            active={Boolean(
              props[
                props["role"] === "option" ? "aria-selected" : "aria-checked"
              ],
            )}
          />
        </Flex>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxRadioItem.displayName = "@optiaxiom/react/ListboxRadioItem";
