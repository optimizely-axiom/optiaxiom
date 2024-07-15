import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Badge } from "../badge";
import { Flex } from "../flex";
import * as styles from "./Indicator.css";

type IndicatorProps = ExtendProps<
  ComponentPropsWithRef<typeof Badge>,
  {
    content: ReactNode;
  } & styles.IndicatorVariants
>;

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      content,
      position = "top-right",
      variant = "solid",
      ...props
    },
    ref,
  ) => {
    return (
      <Flex {...styles.indicator()}>
        <Badge
          colorScheme={colorScheme}
          ref={ref}
          variant={variant}
          {...styles.badge({ position }, className)}
          {...props}
        >
          {content}
        </Badge>
        {children}
      </Flex>
    );
  },
);

Indicator.displayName = "@optiaxiom/react/Indicator";
