import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import type { ExcludeProps } from "../utils";

import { ListboxItemized } from "../listbox";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "./CommandContext";

export type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "itemToKey" | "onPlacedChange"
>;

const itemToKey = (item: CommandOption, inputValue: string | undefined) =>
  item.key ?? resolveItemProperty(item.label, { inputValue });

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const {
      downshift,
      highlightedItem,
      highlightedItemRef,
      inputValue,
      items,
    } = useCommandContext("@optiaxiom/react/CommandListbox");

    const warnedKeysRef = useRef(new Set<string>());
    useEffect(() => {
      if (process.env.NODE_ENV === "production") {
        return;
      }

      const keys = new Set<string>();
      for (const item of items) {
        const key = itemToKey(item, inputValue);
        if (keys.has(key) && !warnedKeysRef.current.has(key)) {
          warnedKeysRef.current.add(key);
          console.error(
            `Duplicate key "${key}" found in options. Pass a unique \`key\` to each option whose label can repeat.`,
          );
        }
        keys.add(key);
      }
    }, [inputValue, items]);

    return (
      <ListboxItemized
        highlightedItem={highlightedItem}
        items={items}
        itemToKey={(item: CommandOption) => itemToKey(item, inputValue)}
        onPlacedChange={(placed) => {
          if (placed && highlightedItemRef.current) {
            highlightedItemRef.current.scrollIntoView({ block: "nearest" });
          }
        }}
        size={size}
        {...downshift.getMenuProps({ ref, ...props })}
      >
        {children}
      </ListboxItemized>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
