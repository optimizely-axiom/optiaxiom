import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Badge.css";

type BadgeProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
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
      <Flex
        px="8"
        py="4"
        rounded="md"
        {...props}
        {...styles.badge({ type }, className)}
        ref={ref}
      >
        <Text as="span" fontSize="inherit">
          {children}
        </Text>
      </Flex>
    );
  },
);

Badge.displayName = "Badge";
