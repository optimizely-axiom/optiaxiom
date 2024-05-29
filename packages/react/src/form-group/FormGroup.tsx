import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils/ExtendProps";

import { Box } from "../box";
import { Text } from "../text";
type FormGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    label?: string;
    note?: string;
    required?: boolean;
  }
>;

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, label, note, ...props }, ref) => {
    return (
      <Box display="flex" flexDirection="column" maxW="sm" ref={ref} {...props}>
        {label && (
          <Text as="label" color="fg.secondary" mb="2">
            {label}
          </Text>
        )}
        {children}
      </Box>
    );
  },
);

FormGroup.displayName = "@optiaxiom/react/FormGroup";
