import type { ComponentPropsWithRef } from "react";

export const Tr = ({ children }: ComponentPropsWithRef<"tr">) => (
  <tr className="nx-border-b">{children}</tr>
);
