import type { ReactNode } from "react";

import { ToastProvider } from "@optiaxiom/react";

import { toaster } from "./toaster";

export function Shell({ children }: { children?: ReactNode }) {
  return (
    <>
      {children}

      <ToastProvider toaster={toaster} />
    </>
  );
}
