import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import { Switch } from "../switch";
import * as styles from "./ListboxCheckboxItem.css";
import { ListboxItem } from "./ListboxItem";

export type ListboxSwitchItemProps = ComponentPropsWithoutRef<
  typeof ListboxItem
> &
  Pick<ComponentPropsWithoutRef<typeof Switch>, "onCheckedChange">;

export const ListboxSwitchItem = forwardRef<
  HTMLDivElement,
  ListboxSwitchItemProps
>(({ addonAfter, onCheckedChange, ...props }, ref) => {
  return (
    <ListboxItem
      addonAfter={
        <Flex flexDirection="row" gap="8">
          {addonAfter}

          <Box
            onClick={
              onCheckedChange
                ? (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onCheckedChange(true);
                  }
                : undefined
            }
            {...styles.checkbox()}
          >
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
          </Box>
        </Flex>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxSwitchItem.displayName = "@optiaxiom/react/ListboxSwitchItem";
