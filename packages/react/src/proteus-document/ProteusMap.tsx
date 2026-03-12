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
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/react/ProteusMap",
  );
  const array = useProteusValue({ path });

  if (!Array.isArray(array)) {
    if (process.env.NODE_ENV !== "production") {
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

ProteusMap.displayName = "@optiaxiom/react/ProteusMap";
