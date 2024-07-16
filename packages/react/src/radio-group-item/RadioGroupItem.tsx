import * as RadixLabel from "@radix-ui/react-label";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { useId } from "@reach/auto-id";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./RadioGroupItem.css";

type RadioGroupItemProps = BoxProps<
  typeof RadixRadio.Item,
  {
    disabled?: boolean;
    endDecorator?: ReactNode;
    id?: string;
    readonly?: boolean;
    value: string;
  }
>;

export const RadioGroupItem = forwardRef<HTMLDivElement, RadioGroupItemProps>(
  (
    { children, disabled, endDecorator, id: idProp, readonly, value, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const id = useId(idProp);
    return (
      <Flex ref={ref} {...styles.wrapper()} {...sprinkleProps}>
        <Flex flexDirection="row" gap="xs">
          <Box asChild {...styles.item()}>
            <RadixRadio.Item
              disabled={disabled}
              id={id}
              value={value}
              {...restProps}
            >
              <Flex asChild {...styles.indicator()}>
                <RadixRadio.Indicator />
              </Flex>
            </RadixRadio.Item>
          </Box>
          <Text asChild {...styles.label({ disabled, readonly })}>
            <RadixLabel.Root htmlFor={id}>{children}</RadixLabel.Root>
          </Text>
        </Flex>
        {endDecorator && (
          <Flex asChild {...styles.endDecorator({})}>
            {endDecorator}
          </Flex>
        )}
      </Flex>
    );
  },
);

RadioGroupItem.displayName = "@optiaxiom/react/RadioGroupItem";
