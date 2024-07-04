import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

// import type { Checkbox } from "../checkbox/Checkbox";
import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./CheckboxGroup.css";

type CheckboxGroupProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children?: ReactNode;
    disabled?: boolean;
    helperText?: string;
    label: string;
    readonly?: boolean;
  }
>;

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ children, className, disabled, helperText, label, ...props }, ref) => {
    return (
      <Flex flexDirection="column" ref={ref} {...styles.base()} {...props}>
        {/* <Box>{children}</Box> */}
        Checkbox Group
      </Flex>
    );
  },
);

CheckboxGroup.displayName = "@optiaxiom/react/Checkbox";
