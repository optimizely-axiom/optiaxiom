import type { ProteusValueProps } from "../proteus-value/ProteusValue";

import { getProteusValue } from "./getProteusValue";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";

export function useProteusValue(element: ProteusValueProps) {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/proteus/useProteusValue",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/useProteusValue",
  );

  return getProteusValue(data, element, parentPath);
}
