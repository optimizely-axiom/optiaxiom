import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { Checkbox } from "../checkbox";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { ListboxItem } from "../listbox-item";
import * as styles from "./ListboxCheckboxItem.css";

type ListboxCheckboxItemProps = ComponentPropsWithoutRef<typeof ListboxItem> &
  Pick<ComponentPropsWithoutRef<typeof Checkbox>, "onCheckedChange">;

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
        <Flex flexDirection="row" gap="8">
          <Box
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onCheckedChange?.(true);
            }}
            {...styles.checkbox()}
          >
            <Checkbox checked={checked} pointerEvents="none" tabIndex={-1} />
          </Box>

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

ListboxCheckboxItem.displayName = "@optiaxiom/react/ListboxCheckboxItem";
