import { forwardRef } from "react";

import { Badge } from "../badge";
import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { ComboboxTrigger } from "../combobox-trigger";
import { Flex } from "../flex";
import { Text } from "../text";

type ComboboxMultiTriggerProps = {
  maxDisplayedItems?: number;
  title?: string;
} & ButtonProps<typeof ComboboxTrigger>;

export const ComboboxMultiTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxMultiTriggerProps
>(({ maxDisplayedItems = 2, title = "Select Items", ...props }, ref) => {
  const { mode, value } = useComboboxContext("Combobox");

  return (
    <ComboboxTrigger asChild>
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
                  <Badge>{item}</Badge>
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
    </ComboboxTrigger>
  );
});

ComboboxMultiTrigger.displayName = "@optiaxiom/react/ComboboxMultiTrigger";
