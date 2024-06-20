import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Radio.css";

type optionProps = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

type RadioProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixRadio.RadioGroup>,
  ComponentPropsWithRef<typeof Box>,
  {
    defaultValue?: string;
    label: string;
    options: optionProps[];
    readonly?: boolean;
  }
>;

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    { className, defaultValue, disabled = false, options, readonly, ...props },
    ref,
  ) => {
    return (
      <Box asChild {...props}>
        <RadixRadio.RadioGroup
          className={className}
          defaultValue={defaultValue}
          disabled={disabled || readonly}
          ref={ref}
        >
          {options.map((option) => (
            <Flex className={styles.optionWrapper} key={option.value}>
              <RadixRadio.Item
                className={styles.RadioGroupItem}
                disabled={option.disabled}
                id={option.value}
                value={option.value}
              >
                <RadixRadio.Indicator className={styles.RadioGroupIndicator} />
              </RadixRadio.Item>
              <Text
                asChild
                color={
                  disabled || option.disabled ? "fg.disabled" : "fg.default"
                }
              >
                <RadixLabel.Root htmlFor={option.value}>
                  {option.label}
                </RadixLabel.Root>
              </Text>
            </Flex>
          ))}
        </RadixRadio.RadioGroup>
      </Box>
    );
  },
);

Radio.displayName = "@optiaxiom/react/Radio";
