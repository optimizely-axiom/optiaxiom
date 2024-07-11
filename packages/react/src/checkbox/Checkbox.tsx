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
import { IconUnchecked } from "./icons-svg/IconUnchecked";

type CheckboxProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    checked?: "indeterminate" | boolean;
    children: ReactNode;
    defaultChecked?: "indeterminate" | boolean;
    disabled?: boolean;
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
      id: idProp,
      readonly = false,
      ...props
    },
    ref,
  ) => {
    const id = useId(idProp);

    return (
      <Flex
        data-disabled={disabled || readonly}
        ref={ref}
        {...styles.wrapper({}, className)}
        {...props}
      >
        <Box asChild {...styles.indicatorWrapper()}>
          <RadixCheckbox.Root
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled || readonly}
            id={id}
          >
            <Box asChild {...styles.indicator()}>
              <RadixCheckbox.Indicator>
                {IconChecked}
                {IconUnchecked}
                {IconIndeterminate}
              </RadixCheckbox.Indicator>
            </Box>
          </RadixCheckbox.Root>
        </Box>

        <Box asChild {...styles.label()}>
          <RadixLabel.Root htmlFor={id}>
            <Text color={disabled ? "fg.disabled" : "fg.default"}>
              {children}
            </Text>
          </RadixLabel.Root>
        </Box>
      </Flex>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
