import type { ReactNode } from "react";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import {
  ProteusDocumentPathProvider,
  useProteusDocumentPathContext,
} from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export type ProteusMapProps = {
  children?: ReactNode;
  /**
   * JSON pointer path to the source array in the data (e.g., '/results')
   */
  path: string;
  /**
   * Optional separator to render between items. Can be a string or a
   * ReactNode for more complex separators.
   */
  separator?: ReactNode;
};

export function ProteusMap({ children, path, separator }: ProteusMapProps) {
  const { strict } = useProteusDocumentContext("@optiaxiom/proteus/ProteusMap");
  const { mapIndices, path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusMap",
  );
  const array = useProteusValue({ path });

  if (!Array.isArray(array)) {
    if (strict) {
      throw new Error(
        `Expected value at "${path}" to be an array got "${typeof array}" instead`,
      );
    }
    return null;
  }

  return (
    <>
      {array.map((_, index) => (
        <ProteusDocumentPathProvider
          key={index}
          mapIndices={[...mapIndices, index]}
          path={`${path.startsWith("/") ? path : `${parentPath}/${path}`}/${index}`}
        >
          {index > 0 && separator}
          {children}
        </ProteusDocumentPathProvider>
      ))}
    </>
  );
}

ProteusMap.displayName = "@optiaxiom/proteus/ProteusMap";
