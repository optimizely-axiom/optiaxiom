import { forwardRef } from "react";

import type { PopoverTrigger } from "../popover-trigger";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { Flex } from "../flex";
import { Pill } from "../pill";
import { Text } from "../text";

type ComboboxMultiTriggerProps = ButtonProps<
  typeof PopoverTrigger,
  {
    maxDisplayedItems?: number;
    title?: string;
  }
>;

export const ComboboxMultiTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxMultiTriggerProps
>(({ maxDisplayedItems = 2, title = "Select Items", ...props }, ref) => {
  const { mode, value } = useComboboxContext("Combobox");

  return (
    <Button alignItems="center" ref={ref} w="full" {...props}>
      <Box overflow="hidden">
        {mode === "multiple" && Array.isArray(value) && value.length > 0 ? (
          <Flex
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
            gap="2"
            overflow="hidden"
          >
            {value.slice(0, maxDisplayedItems).map((item) => (
              <Box flex="none" key={item}>
                <Pill asChild>{item}</Pill>
              </Box>
            ))}
            {value.length > maxDisplayedItems && (
              <Box flex="none">
                <Text>+{value.length - maxDisplayedItems} more</Text>
              </Box>
            )}
          </Flex>
        ) : (
          <Text>{title}</Text>
        )}
      </Box>
    </Button>
  );
});

ComboboxMultiTrigger.displayName = "@optiaxiom/react/ComboboxMultiTrigger";
