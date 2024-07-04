import * as RadixCheckbox from "@radix-ui/react-checkbox";
import * as RadixLabel from "@radix-ui/react-label";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Checkbox.css";

type CheckboxProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    checked?: "indeterminate" | boolean;
    defaultChecked?: "indeterminate" | boolean;
    disabled?: boolean;
    helperText?: string;
    label: string;
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      checked,
      className,
      defaultChecked,
      disabled,
      helperText,
      id,
      label,
      readonly = false,
      ...props
    },
    ref,
  ) => {
    const checkboxId =
      id || `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <Flex
        aria-disabled={disabled || readonly}
        data-disabled={disabled || readonly}
        flexDirection="row"
        gap="8"
        ref={ref}
        {...props}
      >
        <Box
          style={{
            alignSelf: "start",
            display: "flex",
            paddingTop: "4px",
          }}
        >
          <Box asChild {...styles.indicatorRoot()}>
            <RadixCheckbox.Root
              checked={checked}
              data-disabled={disabled || readonly}
              defaultChecked={defaultChecked}
              disabled={disabled || readonly}
              id={checkboxId}
            >
              <RadixCheckbox.Indicator {...styles.indicator()}>
                {checkboxIcon.indeterminate}
                {checkboxIcon.checked}
                {checkboxIcon.unchecked}
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
          </Box>
        </Box>

        <RadixLabel.Root htmlFor={checkboxId} {...styles.rightSection()}>
          <Text
            color={disabled ? "fg.disabled" : "fg.default"}
            fontSize="md"
            style={{
              letterSpacing: "-.1px",
              lineHeight: "20px",
            }}
          >
            {label}
          </Text>
          {helperText && (
            <Text
              color={disabled ? "fg.disabled" : "fg.secondary"}
              fontSize="sm"
              style={{
                letterSpacing: "0.01px",
                lineHeight: "16px",
              }}
            >
              {helperText}
            </Text>
          )}
        </RadixLabel.Root>
      </Flex>
    );
  },
);

const checkboxIcon = {
  checked: (
    <svg
      {...styles.iconC()}
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
      {...styles.iconI()}
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
      {...styles.iconUC()}
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
