import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils/ExtendProps";

import { Box } from "../box";
import { Text } from "../text";
import { useId } from "../utils/useId";
type FormGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children: ReactElement;
    description?: string;
    error?: string;
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    label?: string;
    required?: boolean;
  }
>;

export const FormField = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      children,
      description,
      error,
      id: _id,
      isDisabled,
      isInvalid,
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const id = useId(_id);
    return (
      <Box display="flex" flexDirection="column" maxW="sm" ref={ref} {...props}>
        {label && (
          <Text asChild color={isInvalid ? "border.error" : "fg.secondary"}>
            <label htmlFor={id}>{label}</label>
          </Text>
        )}
        {cloneElement(children, {
          id,
          ["isDisabled"]: isDisabled,
          ["isInvalid"]: isInvalid,
          required,
        })}
        {description && (
          <Text as="p" color={"fg.secondary"}>
            {description}
          </Text>
        )}
        {error && isInvalid && (
          <Text as="p" color={"border.error"}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

FormField.displayName = "@optiaxiom/react/FormField";
