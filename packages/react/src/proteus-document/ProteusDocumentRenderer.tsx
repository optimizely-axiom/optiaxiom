import { type ComponentPropsWithoutRef } from "react";

import { ProteusDocumentShell } from "./ProteusDocumentShell";
import { ProteusElement } from "./ProteusElement";
import { type ProteusDocument, safeParseDocument } from "./schemas";

export type ProteusDocumentRendererProps = Omit<
  ComponentPropsWithoutRef<typeof ProteusDocumentShell>,
  "element"
> & {
  /**
   * The Proteus document to render
   */
  element: ProteusDocument;
};

/**
 * @experimental
 */
export function ProteusDocumentRenderer({
  element: elementProp,
  ...props
}: ProteusDocumentRendererProps) {
  const result = safeParseDocument(elementProp);
  if (!result.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[optiaxiom][react][ProteusElement] Invalid block element:`,
        result.error,
      );
    }
    return null;
  }

  return (
    <ProteusDocumentShell
      element={{
        ...result.data,
        actions: <ProteusElement element={result.data.actions} />,
        body: <ProteusElement element={result.data.body} />,
        subtitle: <ProteusElement element={result.data.subtitle} />,
        title: <ProteusElement element={result.data.title} />,
      }}
      {...props}
    />
  );
}

ProteusDocumentRenderer.displayName =
  "@optiaxiom/react/ProteusDocumentRenderer";
