import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./RadioGroup.css";

type ItemProps = {
  disabled?: boolean;
  endDecorator?: ReactNode;
  label: string;
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
  ({ disabled, items, readonly, ...props }, ref) => {
    return (
      <Flex asChild gap="sm" {...props}>
        <RadixRadio.RadioGroup disabled={disabled || readonly} ref={ref}>
          {items.map((item) => (
            <Flex key={item.value} {...styles.wrapper()}>
              <Flex flexDirection="row" gap="xs">
                <Box asChild {...styles.item()}>
                  <RadixRadio.Item
                    disabled={item.disabled}
                    id={item.value}
                    value={item.value}
                  >
                    <Flex asChild {...styles.indicator()}>
                      <RadixRadio.Indicator />
                    </Flex>
                  </RadixRadio.Item>
                </Box>
                <Text
                  asChild
                  {...styles.label({ disabled: disabled || item.disabled })}
                >
                  <RadixLabel.Root htmlFor={item.value}>
                    {item.label}
                  </RadixLabel.Root>
                </Text>
              </Flex>
              {item.endDecorator && (
                <Flex
                  asChild
                  {...styles.endDecorator({
                    disabled: disabled || item.disabled,
                  })}
                >
                  <RadixLabel.Root htmlFor={item.value}>
                    {item.endDecorator}
                  </RadixLabel.Root>
                </Flex>
              )}
            </Flex>
          ))}
        </RadixRadio.RadioGroup>
      </Flex>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
