import { forwardRef, useMemo } from "react";

import { Badge } from "../badge";
import { type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { Flex } from "../flex";

type ComboboxValueProps = BoxProps<
  "div",
  {
    placeholder?: string;
  }
>;

const maxDisplayedItems = 2;

export const ComboboxValue = forwardRef<HTMLDivElement, ComboboxValueProps>(
  ({ children, placeholder, ...props }, ref) => {
    const {
      itemToKey,
      itemToString,
      value: valueContext,
    } = useComboboxContext("ComboboxValue");
    const value = useMemo(
      () => (valueContext instanceof Set ? [...valueContext] : valueContext),
      [valueContext],
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
  },
);

ComboboxValue.displayName = "@optiaxiom/react/ComboboxValue";
