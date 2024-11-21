import { forwardRef, useMemo } from "react";

import { type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { Flex } from "../flex";

type ComboboxValueProps = BoxProps<
  "div",
  {
    placeholder?: string;
  }
>;

export const ComboboxValue = forwardRef<HTMLDivElement, ComboboxValueProps>(
  ({ children, placeholder, ...props }, ref) => {
    const { itemToString, value: valueContext } =
      useComboboxContext("ComboboxValue");
    const value = useMemo(
      () => (valueContext instanceof Set ? [...valueContext] : valueContext),
      [valueContext],
    );

    return (
      <Flex flexDirection="row" flexWrap="wrap" gap="2" ref={ref} {...props}>
        {Array.isArray(value) && value.length > 0
          ? (children ?? (
              <>
                {value.length === 1 ? (
                  itemToString(value[0])
                ) : (
                  <>{value.length} selected</>
                )}
              </>
            ))
          : placeholder}
      </Flex>
    );
  },
);

ComboboxValue.displayName = "@optiaxiom/react/ComboboxValue";
