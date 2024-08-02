import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import * as styles from "./PaginationButton.css";

// interface PaginationButtonProps extends Omit<ButtonProps, "active"> {
//   active?: boolean;
// }

type PaginationButtonProps = BoxProps<
  typeof Button,
  {
    active: boolean;
  }
>;

export const PaginationButton = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ active = false, className, size, ...props }, ref) => {
  return (
    <Box asChild {...styles.paginationButton({ active }, className)}>
      <Button appearance="secondary" ref={ref} {...props} />
    </Box>
  );
});

PaginationButton.displayName = "@optiaxiom/react/PaginationButton";
