import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./RadioGroup.css";

type ItemProps = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

type RadioGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixRadio.RadioGroup>,
  ComponentPropsWithRef<typeof Flex>,
  {
    items: ItemProps[];
    readonly?: boolean;
  }
>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ disabled = false, items, readonly, ...props }, ref) => {
    return (
      <Flex asChild gap="12" {...props}>
        <RadixRadio.RadioGroup disabled={disabled || readonly} ref={ref}>
          {items.map((item) => (
            <Flex
              alignItems="start"
              flexDirection="row"
              gap="8"
              key={item.value}
            >
              <RadixRadio.Item
                className={styles.item}
                disabled={item.disabled}
                id={item.value}
                value={item.value}
              >
                <RadixRadio.Indicator className={styles.indicator} />
              </RadixRadio.Item>
              <Text
                asChild
                color={disabled || item.disabled ? "fg.disabled" : "fg.default"}
              >
                <RadixLabel.Root htmlFor={item.value}>
                  <Text asChild className={styles.label}>
                    {item.label}
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
