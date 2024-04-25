import type { ComponentPropsWithRef } from "react";

export const Tr = ({ children }: ComponentPropsWithRef<"tr">) => (
  <tr className="nx-border-b nx-border-neutral-200/70 dark:nx-border-primary-100/10">
    {children}
  </tr>
);
