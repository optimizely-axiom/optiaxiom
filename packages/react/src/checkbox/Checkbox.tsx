// import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Checkbox.css";

type optionProps = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

type CheckboxProps = ExtendProps<
  // ComponentPropsWithRef<typeof RadixCheckbox.CheckboxGroup>,
  ComponentPropsWithRef<typeof Box>,
  {
    defaultValue?: string;
    label: string;
    options: optionProps[];
    readonly?: boolean;
  }
>;

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, defaultValue, options, readonly, ...props }, ref) => {
    return (
      <Box asChild {...props} ref={ref}>
        <Box className={styles.optionWrapper}>Checkbox</Box>
      </Box>
    );
  },
);

Checkbox.displayName = "@optiaxiom/react/Checkbox";
