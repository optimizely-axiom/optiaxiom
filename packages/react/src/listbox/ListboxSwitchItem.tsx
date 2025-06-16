import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Flex } from "../flex";
import { Icon } from "../icon";
import { Switch } from "../switch";
import { ListboxItem } from "./ListboxItem";

export type ListboxSwitchItemProps = ComponentPropsWithoutRef<
  typeof ListboxItem
>;

export const ListboxSwitchItem = forwardRef<
  HTMLDivElement,
  ListboxSwitchItemProps
>(({ addonBefore, icon, ...props }, ref) => {
  return (
    <ListboxItem
      addonBefore={
        <Flex flexDirection="row" gap="8">
          <Switch
            checked={Boolean(
              props[
                props["role"] === "option" ? "aria-selected" : "aria-checked"
              ],
            )}
            hidden
            pointerEvents="none"
            tabIndex={-1}
          />

          {addonBefore ? (
            addonBefore
          ) : icon ? (
            <Icon asChild>{icon}</Icon>
          ) : null}
        </Flex>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxSwitchItem.displayName = "@optiaxiom/react/ListboxSwitchItem";
