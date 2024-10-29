import { Box, type BoxProps } from "../box";

export type BreadcrumbSeparatorProps = BoxProps<"span">;

export function BreadcrumbSeparator({
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <Box asChild {...props}>
      <li>{children ?? <span>/</span>}</li>
    </Box>
  );
}

BreadcrumbSeparator.displayName = "@optiaxiom/react/BreadcrumbSeparator";
