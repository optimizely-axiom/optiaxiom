import { Box, type BoxProps } from "../box";
import { IconEllipsis } from "../icons/IconEllipsis";

export type BreadcrumbEllipsisProps = BoxProps<"span">;

export function BreadcrumbEllipsis({ ...props }: BreadcrumbEllipsisProps) {
  return (
    <Box asChild display="flex" {...props}>
      <IconEllipsis />
    </Box>
  );
}
BreadcrumbEllipsis.displayName = "@optiaxiom/react/BreadcrumbEllipsis";
