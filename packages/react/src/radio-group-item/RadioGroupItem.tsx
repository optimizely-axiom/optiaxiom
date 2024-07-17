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
    endDecorator?: ReactNode;
    readonly?: boolean;
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
      <Flex ref={ref} {...styles.wrapper({ readonly })} {...sprinkleProps}>
        <Flex flexDirection="row" gap="0">
          <Box asChild {...styles.item()}>
            <RadixRadio.Item
              disabled={disabled || readonly}
              id={id}
              value={value}
              {...restProps}
            >
              <Box asChild {...styles.indicator()}>
                <RadixRadio.Indicator />
              </Box>
            </RadixRadio.Item>
          </Box>

          <Text asChild {...styles.label()}>
            <RadixLabel.Root htmlFor={id}>{children}</RadixLabel.Root>
          </Text>
        </Flex>

        {endDecorator && (
          <Box asChild ml="lg">
            {endDecorator}
          </Box>
        )}
      </Flex>
    );
  },
);

RadioGroupItem.displayName = "@optiaxiom/react/RadioGroupItem";
