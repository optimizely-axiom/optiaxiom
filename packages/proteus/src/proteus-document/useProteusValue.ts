import type { ProteusValue } from "./schemas";

import { getProteusValue } from "./getProteusValue";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";

export function useProteusValue(
  element: Pick<ProteusValue, "formatter" | "path">,
) {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/react/useProteusValue",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/useProteusValue",
  );

  return getProteusValue(data, element, parentPath);
}
