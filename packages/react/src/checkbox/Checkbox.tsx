import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { useId } from "@reach/auto-id";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Checkbox.css";

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
                {checkboxIcon.indeterminate}
                {checkboxIcon.checked}
                {checkboxIcon.unchecked}
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

const checkboxIcon = {
  checked: (
    <svg
      {...styles.iconChecked()}
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3.47059L4.83333 7L10.5 1"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  indeterminate: (
    <svg
      {...styles.iconIndeterminate()}
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.85714 3.19995C2.35714 3.19995 2 3.56662 2 3.99995C2 4.46662 2.35714 4.79995 2.85714 4.79995H9.14286C9.60714 4.79995 10 4.46662 10 3.99995C10 3.56662 9.60714 3.19995 9.14286 3.19995H2.85714Z"
        fill="white"
      />
    </svg>
  ),
  unchecked: (
    <svg
      {...styles.iconUnchecked()}
      fill="none"
      height="8"
      viewBox="0 0 12 8"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3.47059L4.83333 7L10.5 1"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

Checkbox.displayName = "@optiaxiom/react/Checkbox";
