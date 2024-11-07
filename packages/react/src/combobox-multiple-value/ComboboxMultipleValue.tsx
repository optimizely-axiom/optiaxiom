import type { UseComboboxProps } from "downshift";

import { forwardRef } from "react";

import { Badge } from "../badge";
import { type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { Flex } from "../flex";

type ComboboxMultipleValueProps = BoxProps<
  "div",
  {
    placeholder?: string;
    value: unknown[];
  } & Pick<UseComboboxProps<unknown>, "itemToKey" | "itemToString">
>;

const maxDisplayedItems = 2;

export const ComboboxMultipleValue = forwardRef<
  HTMLDivElement,
  ComboboxMultipleValueProps
>(({ children, placeholder, value, ...props }, ref) => {
  const { itemToKey, itemToString } = useComboboxContext(
    "ComboboxMultipleValue",
  );

  return (
    <Flex flexDirection="row" flexWrap="wrap" gap="2" ref={ref} {...props}>
      {Array.isArray(value) && value.length > 0
        ? (children ?? (
            <>
              {value.length > maxDisplayedItems ? (
                <Badge>{value.length} selected</Badge>
              ) : (
                value.slice(0, maxDisplayedItems).map((item) => (
                  <Badge
                    display="inline-block"
                    flex="1"
                    key={itemToKey(item)}
                    truncate
                  >
                    {itemToString(item)}
                  </Badge>
                ))
              )}
            </>
          ))
        : placeholder}
    </Flex>
  );
});

ComboboxMultipleValue.displayName = "@optiaxiom/react/ComboboxMultipleValue";
