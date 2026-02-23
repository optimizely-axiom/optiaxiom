import { getProteusValue } from "./getProteusValue";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";

export function useProteusValue(path: string) {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/react/useProteusValue",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/useProteusValue",
  );

  return getProteusValue(data, path, parentPath);
}
