import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Checkbox.css";
import { IconChecked } from "./icons-svg/IconChecked";
import { IconIndeterminate } from "./icons-svg/IconIndeterminate";

type CheckboxProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    checked?: "indeterminate" | boolean;
    defaultChecked?: "indeterminate" | boolean;
    disabled?: boolean;
    endDecorator?: ReactNode;
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      checked,
      children,
      className,
      defaultChecked,
      disabled,
      endDecorator,
      id: idProp,
      readonly,
      ...props
    },
    ref,
  ) => {
    const id = useId(idProp);
    const isDisabled = Boolean(disabled || readonly);

    return (
      <Flex
        ref={ref}
        {...styles.wrapper(
          {
            disabled: isDisabled,
          },
          className,
        )}
        {...props}
      >
        <Flex flexDirection="row" gap="xs">
          <Box
            asChild
            {...styles.indicatorWrapper({
              disabled: isDisabled,
            })}
          >
            <RadixCheckbox.Root
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={isDisabled}
              id={id}
            >
              <Box asChild {...styles.indicator({ disabled: isDisabled })}>
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

          <RadixLabel.Root htmlFor={id}>
            <Text {...styles.label({ disabled })}>{children}</Text>
          </RadixLabel.Root>
        </Flex>
        <RadixLabel.Root htmlFor={id}>
          <Text {...styles.endDecorator({ disabled })}>{endDecorator}</Text>
        </RadixLabel.Root>
      </Flex>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
