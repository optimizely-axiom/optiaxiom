import { Box, type BoxProps } from "../box";
import { IconEllipsis } from "../icons/IconEllipsis";

export type BreadcrumbEllipsisProps = BoxProps<"span">;

export function BreadcrumbEllipsis({ ...props }: BreadcrumbEllipsisProps) {
  return (
    <Box display="grid" placeItems="center" {...props}>
      <IconEllipsis />
    </Box>
  );
}
BreadcrumbEllipsis.displayName = "@optiaxiom/react/BreadcrumbEllipsis";
