import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./PaginationButton.css";

type PaginationButtonProps = BoxProps<
  "button",
  {
    active?: boolean;
    endDecorator?: ReactNode;
    startDecorator?: ReactNode;
  }
>;

export const PaginationButton = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(
  (
    {
      active = false,
      children,
      className,
      disabled,
      endDecorator,
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        data-state={active ? "on" : "off"}
        {...styles.paginationButton({}, className)}
        {...sprinkleProps}
      >
        <button disabled={disabled} ref={ref} {...restProps}>
          {startDecorator}
          <Box mx={startDecorator || endDecorator ? "4" : "0"}>{children}</Box>
          {endDecorator}
        </button>
      </Box>
    );
  },
);

PaginationButton.displayName = "@optiaxiom/react/PaginationButton";
