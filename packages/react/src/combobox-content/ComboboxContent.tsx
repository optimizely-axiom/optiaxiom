import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useContext,
} from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { CommandCheckboxItem } from "../command-checkbox-item";
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

    const { items, mode, onSelect, setOpen, setValue, value } = context;

    const handleSelect = (currentValue: string) => {
      if (mode === "single") {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
      } else if (mode === "multiple") {
        const valueArray = value ? value.split(",") : [];
        let newValue: string;
        if (valueArray.includes(currentValue)) {
          newValue = valueArray.filter((v) => v !== currentValue).join(",");
        } else {
          newValue = [...valueArray, currentValue].join(",");
        }
        setValue(newValue);
      }
      if (onSelect) {
        onSelect(currentValue);
      }
    };

    const isSelected = (itemValue: string) => {
      if (mode === "single") {
        return value === itemValue;
      } else if (mode === "multiple") {
        return value?.split(",").includes(itemValue);
      }
      return false;
    };

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
              {items?.map((item) =>
                mode === "multiple" ? (
                  <CommandCheckboxItem
                    checked={isSelected(item.value)}
                    key={item.value}
                    onCheckedChange={() => handleSelect(item.value)}
                    value={item.value}
                  >
                    {item.label}
                  </CommandCheckboxItem>
                ) : (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item.value)}
                    value={item.value}
                  >
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      w="full"
                    >
                      {item.label}
                      {isSelected(item.value) && (
                        <Box color="black" mr="2">
                          <IconCheck />
                        </Box>
                      )}
                    </Box>
                  </CommandItem>
                ),
              )}
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
