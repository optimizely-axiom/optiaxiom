import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./RadioGroup.css";

type optionProps = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

type RadioGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixRadio.RadioGroup>,
  ComponentPropsWithRef<typeof Flex>,
  {
    defaultValue?: string;
    label: string;
    options: optionProps[];
    readonly?: boolean;
  }
>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { className, defaultValue, disabled = false, options, readonly, ...props },
    ref,
  ) => {
    return (
      <Flex asChild gap="12" {...props}>
        <RadixRadio.RadioGroup
          className={className}
          defaultValue={defaultValue}
          disabled={disabled || readonly}
          ref={ref}
        >
          {options.map((option) => (
            <Flex className={styles.option} key={option.value}>
              <RadixRadio.Item
                className={styles.item}
                disabled={option.disabled}
                id={option.value}
                value={option.value}
              >
                <RadixRadio.Indicator className={styles.indicator} />
              </RadixRadio.Item>
              <Text
                asChild
                color={
                  disabled || option.disabled ? "fg.disabled" : "fg.default"
                }
              >
                <RadixLabel.Root htmlFor={option.value}>
                  <Text as="span" className={styles.label}>
                    {option.label}
                  </Text>
                  <Text as="p" fontSize="sm">
                    {option.description}
                  </Text>
                </RadixLabel.Root>
              </Text>
            </Flex>
          ))}
        </RadixRadio.RadioGroup>
      </Flex>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
