import { forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandItemContextProvider } from "../command-item-context";
import { CommandUnstyledItem } from "../command-unstyled-item";
import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";

type CommandItemProps = ListboxItemBaseProps<
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
        <ListboxItemBase
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          description={description}
          icon={icon}
          mx="4"
          {...props}
        >
          <CommandUnstyledItem item={item} ref={ref} tabIndex={undefined}>
            {children}
          </CommandUnstyledItem>
        </ListboxItemBase>
      </CommandItemContextProvider>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
