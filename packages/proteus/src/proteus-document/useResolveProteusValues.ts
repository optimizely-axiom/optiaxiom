import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { useProteusDocumentPathContext } from "./ProteusDocumentPathContext";
import { resolveProteusValue } from "./resolveProteusValue";

export function useResolveProteusValues(
  props: Record<string, unknown>,
): Record<string, unknown> {
  const { data } = useProteusDocumentContext(
    "@optiaxiom/react/useResolvedProteusProps",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/useResolvedProteusProps",
  );

  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    resolved[key] = resolveProteusValue(value, data, parentPath);
  }
  return resolved;
}
