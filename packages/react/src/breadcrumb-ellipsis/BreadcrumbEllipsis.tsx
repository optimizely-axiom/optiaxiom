import { Box, type BoxProps } from "../box";
import { IconEllipsis } from "../icons/IconEllipsis";

export type BreadcrumbEllipsisProps = BoxProps<"span">;

export const BreadcrumbEllipsis = ({ ...props }: BreadcrumbEllipsisProps) => (
  <Box asChild display="flex" {...props}>
    <IconEllipsis />
  </Box>
);
BreadcrumbEllipsis.displayName = "@optiaxiom/react/BreadcrumbEllipsis";
