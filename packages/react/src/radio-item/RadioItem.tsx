import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./RadioItem.css";

type RadioItemProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixRadio.Item>,
  {
    disabled?: boolean;
    endDecorator?: ReactNode;
    value: string;
  }
>;

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ children, disabled, endDecorator, value, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex {...styles.wrapper()} ref={ref} {...sprinkleProps}>
        <Flex flexDirection="row" gap="xs">
          <Box asChild {...styles.item()} {...restProps}>
            <RadixRadio.Item disabled={disabled} id={value} value={value}>
              <Flex asChild {...styles.indicator()}>
                <RadixRadio.Indicator />
              </Flex>
            </RadixRadio.Item>
          </Box>
          <Text asChild {...styles.label({ disabled })}>
            <RadixLabel.Root htmlFor={value}>{children}</RadixLabel.Root>
          </Text>
        </Flex>
        {endDecorator && (
          <Flex
            asChild
            {...styles.endDecorator({
              disabled,
            })}
          >
            {endDecorator}
          </Flex>
        )}
      </Flex>
    );
  },
);

RadioItem.displayName = "@optiaxiom/react/RadioItem";
