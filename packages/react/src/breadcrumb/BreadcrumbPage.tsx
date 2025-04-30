import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type BreadcrumbPageProps = BoxProps<"span">;
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ ...props }, ref) => {
    return (
      <Box aria-current="page" asChild color="fg.default" fontSize="md">
        <span ref={ref} {...props} />
      </Box>
    );
  },
);
BreadcrumbPage.displayName = "@optiaxiom/react/BreadcrumbPage";
