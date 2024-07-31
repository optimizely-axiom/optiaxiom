import { type ReactNode, useState } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { CommandSeparator } from "../command-separator";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconCheck } from "../icons/IconCheck";
import { Popover } from "../popover";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";
import { Search } from "../search";

type item = {
  label: string;
  value: string;
};

type ComboboxProps = BoxProps<
  typeof Command,
  {
    emptyResult?: ReactNode;
    items: item[];
    onSelect?: (value: string) => void;
  }
>;

export const Combobox = ({
  children,
  defaultValue = "",
  emptyResult,
  items = [],
  onSelect,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          icon={<IconAngleDown />}
          iconPosition="end"
          justifyContent="space-between"
          variant="outline"
          w="208"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : "Select item..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild px="4">
        <Command alignItems="center" {...props}>
          <CommandInput asChild display="none">
            <Search display="none" my="4" />
          </CommandInput>

          <CommandSeparator alwaysRender />

          <CommandEmpty asChild>
            <Flex alignItems="center" py="8">
              {emptyResult || "No results found"}
            </Flex>
          </CommandEmpty>

          <CommandList mt="4">
            {items.map((item) => (
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
      </PopoverContent>
    </Popover>
  );
};

Combobox.displayName = "@optiaxiom/react/Combobox";
