import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Text } from "../text";
import * as styles from "./Badge.css";

type BadgeProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    children: ReactNode;
    type?:
      | "danger"
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning";
  }
>;

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, className, type = "default", ...props }, ref) => {
    return (
      <Box
        asChild
        mb="4"
        mr="4"
        px="8"
        py="4"
        rounded="sm"
        {...props}
        {...styles.badge({ type }, className)}
        ref={ref}
      >
        <Text as="span">{children}</Text>
      </Box>
    );
  },
);

Badge.displayName = "Badge";
