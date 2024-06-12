import { useId } from "@reach/auto-id";
import clsx from "clsx";
import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
  forwardRef,
} from "react";

import type { ExtendProps } from "../utils/ExtendProps";

import { Box } from "../box";
import { Text } from "../text";
import * as styles from "./FormField.css";
type FormGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children: ReactElement;
    description?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    required?: boolean;
  }
>;

export const FormField = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      children,
      className,
      description,
      disabled,
      error,
      id: _id,
      label,
      required,
      ...props
    },
    ref,
  ) => {
    const id = useId(_id);
    return (
      <Box className={clsx(styles.formField, className)} ref={ref} {...props}>
        {label && (
          <Text asChild className={styles.label}>
            <label htmlFor={id}>
              {label}{" "}
              {required && <span className={styles.labelRequired}>*</span>}
            </label>
          </Text>
        )}
        {cloneElement(children, {
          disabled,
          error: !!error,
          id,
          required,
        })}
        {description && (
          <Text as="p" className={styles.description}>
            {description}
          </Text>
        )}
        {error && (
          <Text as="p" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

FormField.displayName = "@optiaxiom/react/FormField";
