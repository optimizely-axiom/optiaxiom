import type { ProteusValueProps } from "../proteus-value/ProteusValue";

import { getProteusValue } from "../proteus-document/getProteusValue";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";

export function useProteusValue(element: ProteusValueProps) {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/proteus/useProteusValue",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/useProteusValue",
  );

  return getProteusValue(data, element, parentPath);
}
