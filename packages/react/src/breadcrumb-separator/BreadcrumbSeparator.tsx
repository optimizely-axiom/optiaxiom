import { Box, type BoxProps } from "../box";

export type BreadcrumbSeparatorProps = BoxProps<"span">;

// fix separator in item
export function BreadcrumbSeparator({
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <Box aria-hidden asChild color="fg.tertiary" {...props}>
      <li>{children ?? <span>/</span>}</li>
    </Box>
  );
}

BreadcrumbSeparator.displayName = "@optiaxiom/react/BreadcrumbSeparator";
