import type { ElementType, ReactNode } from "react";

export const Box = ({
  as: Comp = "div",
  children,
  ...props
}: {
  as: ElementType;
  children: ReactNode;
}) => <Comp {...props}>{children}</Comp>;
