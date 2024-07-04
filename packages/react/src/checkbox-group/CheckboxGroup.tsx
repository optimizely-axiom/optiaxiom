import React, { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Checkbox, type CheckboxProps } from "../checkbox/Checkbox";
import { Flex } from "../flex";
type CheckboxGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    checkboxItems: Array<{ id: string } & CheckboxProps>;
    disabled?: boolean;
    helperText?: string;
    label: string;
    readonly?: boolean;
  }
>;

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      checkboxItems,
      className,
      disabled,
      helperText,
      label,
      readonly,
      ...props
    },
    ref,
  ) => {
    const [checkedItems, setCheckedItems] = React.useState<boolean[]>(
      checkboxItems.map((item) => !!item.defaultChecked),
    );

    const handleCheckboxChange = (
      index: number,
      checked: "indeterminate" | boolean,
    ) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = checked === true;
      setCheckedItems(newCheckedItems);
    };

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
      <Flex flexDirection="column" ref={ref} {...props}>
        <Checkbox
          checked={isIndeterminate ? "indeterminate" : allChecked}
          disabled={disabled}
          helperText={helperText}
          label={label || ""}
          onCheckedChange={() => {
            const newState = !allChecked;
            setCheckedItems(checkboxItems.map(() => newState));
          }}
          readonly={readonly}
        />
        <Flex flexDirection="column" gap="8" pl="16">
          {checkboxItems?.map((checkboxProps, index) => (
            <Checkbox
              key={checkboxProps.id}
              {...checkboxProps}
              checked={checkedItems[index]}
              disabled={disabled || checkboxProps.disabled}
              helperText={checkboxProps.helperText}
              onCheckedChange={(checked) =>
                handleCheckboxChange(index, checked)
              }
              readonly={readonly || checkboxProps.readonly}
            />
          ))}
        </Flex>
      </Flex>
    );
  },
);

CheckboxGroup.displayName = "@optiaxiom/react/Checkbox";
