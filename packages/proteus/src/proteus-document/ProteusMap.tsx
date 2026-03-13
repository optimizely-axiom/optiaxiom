import { useProteusDocumentContext } from "./ProteusDocumentContext";
import {
  ProteusDocumentPathProvider,
  useProteusDocumentPathContext,
} from "./ProteusDocumentPathContext";
import { useProteusValue } from "./useProteusValue";

export function ProteusMap({
  children,
  path,
  separator,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  path: string;
  separator?: unknown;
}) {
  const { strict } = useProteusDocumentContext("@optiaxiom/proteus/ProteusMap");
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusMap",
  );
  const array = useProteusValue({ path });

  if (!Array.isArray(array)) {
    if (strict) {
      console.error(
        `[optiaxiom][react][ProteusMap] Path "${path}" did not resolve to an array:`,
        array,
      );
    }
    return null;
  }

  return (
    <>
      {array.map((_, index) => (
        <ProteusDocumentPathProvider
          key={index}
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
