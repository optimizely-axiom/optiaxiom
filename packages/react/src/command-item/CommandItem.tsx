import { CommandItem as CmdkCommandItem } from "cmdk";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./CommandItem.css";

type CommandItemProps = BoxProps<
  typeof CmdkCommandItem,
  {
    value: string;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, className, onSelect, value, ...props }, ref) => {
    const {
      mode,
      setOpen,
      setValue,
      value: contextValue,
    } = useComboboxContext("ComboboxContext");

    const { restProps, sprinkleProps } = extractSprinkles(props);

    const handleSelect = () => {
      if (mode === "single") {
        setOpen(false);
        setValue(value);
      } else if (mode === "multiple" && Array.isArray(contextValue)) {
        const newValue = contextValue.includes(value)
          ? contextValue.filter((v) => v !== value)
          : [...contextValue, value];
        setValue(newValue);
      }

      if (onSelect) onSelect(value);
    };

    const isSelected =
      mode === "single"
        ? contextValue === value
        : Array.isArray(contextValue) && contextValue.includes(value);

    return (
      <Box asChild {...styles.item({}, className)} {...sprinkleProps}>
        <CmdkCommandItem onSelect={handleSelect} ref={ref} {...restProps}>
          <Flex flexDirection="row" justifyContent="space-between" w="full">
            {children}
            {isSelected && mode === "single" && <IconCheck />}
          </Flex>
        </CmdkCommandItem>
      </Box>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
