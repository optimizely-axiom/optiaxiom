import type { ComponentPropsWithRef } from "react";

import { theme } from "@optiaxiom/react";

export const Thead = ({ children }: ComponentPropsWithRef<"thead">) => (
  <thead style={{ borderBottom: `1px solid ${theme.color["slate.200"]}` }}>
    {children}
  </thead>
);
