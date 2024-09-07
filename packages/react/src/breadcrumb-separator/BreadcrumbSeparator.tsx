import { Box, type BoxProps } from "../box";

export type BreadcrumbSeparatorProps = BoxProps<"span">;

export const BreadcrumbSeparator = ({
  asChild,
  children,
  ...props
}: BreadcrumbSeparatorProps) => {
  const Comp = asChild ? Box : "span";
  return <Comp {...props}>{children ?? <span>/</span>}</Comp>;
};

BreadcrumbSeparator.displayName = "@optiaxiom/react/BreadcrumbSeparator";
