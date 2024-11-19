import { forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandItemContextProvider } from "../command-item-context";
import { CommandUnstyledItem } from "../command-unstyled-item";
import { ListboxItem, type ListboxItemProps } from "../listbox-item";
import * as styles from "./CommandItem.css";

type CommandItemProps = ListboxItemProps<
  "div",
  {
    active?: boolean;
    item: unknown;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      active,
      addonAfter,
      addonBefore,
      children,
      className,
      description,
      icon,
      item,
      ...props
    },
    ref,
  ) => {
    const { value } = useCommandContext("CommandItem");

    return (
      <CommandItemContextProvider
        active={active ?? value?.has(item)}
        item={item}
      >
        <ListboxItem
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          asChild
          description={description}
          icon={icon}
          {...styles.item({}, className)}
          {...props}
        >
          <CommandUnstyledItem item={item} ref={ref} tabIndex={undefined}>
            {children}
          </CommandUnstyledItem>
        </ListboxItem>
      </CommandItemContextProvider>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
