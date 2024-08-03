import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./PaginationButton.css";

type PaginationButtonProps = BoxProps<
  typeof Button,
  {
    active?: boolean;
  }
>;

export const PaginationButton = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ active = false, className, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Box
      asChild
      {...styles.paginationButton({ active }, className)}
      {...sprinkleProps}
    >
      <Button
        appearance="secondary"
        gap="2"
        ref={ref}
        rounded="md"
        {...restProps}
      />
    </Box>
  );
});

PaginationButton.displayName = "@optiaxiom/react/PaginationButton";
