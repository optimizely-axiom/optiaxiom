import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";

export type ProteusMapIndexProps = Record<never, never>;

export function ProteusMapIndex() {
  const { mapIndices } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusMapIndex",
  );
  const index = mapIndices.at(-1);
  return index === undefined ? null : index;
}

ProteusMapIndex.displayName = "@optiaxiom/proteus/ProteusMapIndex";
