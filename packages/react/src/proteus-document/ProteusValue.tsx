import type { ProteusValue as ProteusValueProps } from "./schemas";

import { useProteusValue } from "./useProteusValue";

export function ProteusValue(
  element: Pick<ProteusValueProps, "formatter" | "path">,
) {
  return useProteusValue(element);
}

ProteusValue.displayName = "@optiaxiom/react/ProteusValue";
