import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { Checkbox } from "../checkbox";
import { Group } from "../group";
import { Icon } from "../icon";
import * as styles from "./ListboxCheckboxItem.css";
import { ListboxItem } from "./ListboxItem";

export type ListboxCheckboxItemProps = ComponentPropsWithoutRef<
  typeof ListboxItem
> &
  Pick<ComponentPropsWithoutRef<typeof Checkbox>, "onCheckedChange">;

/**
 * @group Listbox
 */
export const ListboxCheckboxItem = forwardRef<
  HTMLDivElement,
  ListboxCheckboxItemProps
>(({ addonBefore, icon, onCheckedChange, ...props }, ref) => {
  const checked = Boolean(
    props[props["role"] === "option" ? "aria-selected" : "aria-checked"],
  );

  return (
    <ListboxItem
      addonBefore={
        <Group gap="8">
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
            <Checkbox
              checked={checked}
              hidden
              pointerEvents="none"
              tabIndex={-1}
            />
          </Box>

          {addonBefore ? (
            addonBefore
          ) : icon ? (
            <Icon asChild>{icon}</Icon>
          ) : null}
        </Group>
      }
      ref={ref}
      {...props}
    />
  );
});

ListboxCheckboxItem.displayName = "@optiaxiom/react/ListboxCheckboxItem";
