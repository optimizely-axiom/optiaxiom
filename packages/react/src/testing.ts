import { toaster } from "@optiaxiom/globals";

import { dialogkit } from "./dialog-kit";

export function cleanup() {
  dialogkit.clear();
  toaster.clear();
}
