import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { CommandInput } from "../command-input";
import { CommandSeparator } from "../command-separator";
import { PopoverContent } from "../popover-content";
import { SearchInput } from "../search-input";

type ComboboxContentProps = BoxProps<
  typeof Command,
  {
    emptyResult?: ReactNode;
  } & ComponentPropsWithRef<typeof PopoverContent>
>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ asChild, children, ...props }, ref) => {
    const context = useComboboxContext("Combobox");
    if (!context)
      throw new Error("ComboboxContent must be used within a Combobox");

    return (
      <PopoverContent asChild p="0" ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Command>
            <CommandInput asChild>
              <SearchInput m="2" />
            </CommandInput>
            <CommandSeparator alwaysRender />
            {children}
          </Command>
        )}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
