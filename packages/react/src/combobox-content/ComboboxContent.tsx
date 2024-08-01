import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useContext,
} from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxContext } from "../combobox";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { CommandSeparator } from "../command-separator";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import { PopoverContent } from "../popover-content";
import { Search } from "../search";

type ComboboxContentProps = BoxProps<
  typeof Command,
  {
    emptyResult?: ReactNode;
  } & ComponentPropsWithRef<typeof PopoverContent>
>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ asChild, children, emptyResult, ...props }, ref) => {
    const context = useContext(ComboboxContext);
    if (!context)
      throw new Error("ComboboxContent must be used within a Combobox");

    const { items, onSelect, setOpen, setValue, value } = context;

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
            <CommandEmpty asChild>
              <Flex alignItems="center" py="4">
                {emptyResult || "No results found"}
              </Flex>
            </CommandEmpty>
            <CommandList maxH="sm" mt="4" overflow="auto">
              {items?.map((item) => (
                <CommandItem
                  key={item.value}
                  keywords={[item.value, item.label]}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (onSelect) {
                      onSelect(currentValue);
                    }
                  }}
                  tabIndex={0}
                  value={item.value}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    w="full"
                  >
                    {item.label}
                    {value == item.value ? (
                      <Box color="black" mr="2">
                        <IconCheck />
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
