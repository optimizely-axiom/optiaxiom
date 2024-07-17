import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./Checkbox.css";
import { IconChecked } from "./icons-svg/IconChecked";
import { IconIndeterminate } from "./icons-svg/IconIndeterminate";

type CheckboxProps = BoxProps<
  typeof RadixCheckbox.Root,
  {
    endDecorator?: ReactNode;
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      children,
      className,
      disabled,
      endDecorator,
      id: idProp,
      readonly,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const id = useId(idProp);

    return (
      <Flex
        ref={ref}
        {...styles.checkbox({ readonly }, className)}
        {...sprinkleProps}
      >
        <Flex flexDirection="row" gap="0">
          <Box asChild {...styles.indicatorRoot()}>
            <RadixCheckbox.Root
              disabled={Boolean(disabled || readonly)}
              id={id}
              {...restProps}
            >
              <Box asChild {...styles.indicator()}>
                <RadixCheckbox.Indicator>
                  <Box asChild {...styles.iconChecked()}>
                    <IconChecked />
                  </Box>
                  <Box asChild {...styles.iconIndeterminate()}>
                    <IconIndeterminate />
                  </Box>
                </RadixCheckbox.Indicator>
              </Box>
            </RadixCheckbox.Root>
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

Checkbox.displayName = "@optiaxiom/react/Checkbox";
