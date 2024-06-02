import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils/ExtendProps";

import { Box } from "../box";
import { Text } from "../text";
type FormGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children: ReactElement;
    isDisabled?: boolean;
    isInvalid?: boolean;
    label?: string;
    note?: string;
    required?: boolean;
  }
>;

export const FormField = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, isDisabled, isInvalid, label, note, ...props }, ref) => {
    return (
      <Box display="flex" flexDirection="column" maxW="sm" ref={ref} {...props}>
        {label && (
          <Text as="label" color={isInvalid ? "border.error" : "fg.secondary"}>
            {label}
          </Text>
        )}
        {cloneElement(children, {
          ["isDisabled"]: isDisabled,
          ["isInvalid"]: isInvalid,
        })}
        {note && (
          <Text as="label" color={isInvalid ? "border.error" : "fg.secondary"}>
            {note}
          </Text>
        )}
      </Box>
    );
  },
);

FormField.displayName = "@optiaxiom/react/FormField";
