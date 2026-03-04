import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { resolveProteusValue } from "./resolveProteusValue";

export function useResolvedProteusValue(value: unknown) {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/react/useResolvedProteusValue",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/useResolvedProteusValue",
  );

  return resolveProteusValue(value, data, parentPath);
}
