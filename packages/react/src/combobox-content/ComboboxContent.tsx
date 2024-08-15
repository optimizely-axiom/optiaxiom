import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useContext,
} from "react";

import { type BoxProps } from "../box";
import { ComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { CommandInput } from "../command-input";
import { CommandSeparator } from "../command-separator";
import { PopoverContent } from "../popover-content";
import { Search } from "../search";

type ComboboxContentProps = BoxProps<
  typeof Command,
  {
    emptyResult?: ReactNode;
  } & ComponentPropsWithRef<typeof PopoverContent>
>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ asChild, children, ...props }, ref) => {
    const context = useContext(ComboboxContext);
    if (!context)
      throw new Error("ComboboxContent must be used within a Combobox");

    return (
      <PopoverContent asChild p="0" ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Command alignItems="center">
            <CommandInput asChild>
              <Search m="2" />
            </CommandInput>
            <CommandSeparator />
            {children}
          </Command>
        )}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
