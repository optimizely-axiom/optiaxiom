import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./Indicator.css";

type IndicatorProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
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
      <Flex {...styles.indicatorContainer()}>
        <Flex
          ref={ref}
          {...styles.indicator({ colorScheme, position, variant }, className)}
          {...props}
        >
          {content}
        </Flex>
        {children}
      </Flex>
    );
  },
);

Indicator.displayName = "@optiaxiom/react/Indicator";
