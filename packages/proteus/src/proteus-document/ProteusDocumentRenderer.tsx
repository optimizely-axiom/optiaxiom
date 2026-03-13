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
  /**
   * If true, the renderer will throw an error if the provided document is invalid. Otherwise, it will fail silently and render nothing.
   */
  strict?: boolean;
};

export function ProteusDocumentRenderer({
  element: elementProp,
  strict = false,
  ...props
}: ProteusDocumentRendererProps) {
  const result = safeParseDocument(elementProp);
  if (!result.success) {
    if (strict) {
      throw new Error(
        `[optiaxiom][react][ProteusElement] Invalid block element: ${result.error.join("\n")}`,
      );
    }
    return null;
  }

  return (
    <ProteusDocumentShell
      element={{
        ...result.data,
        actions: hasValue(result.data.actions) && (
          <ProteusElement element={result.data.actions} />
        ),
        body: hasValue(result.data.body) && (
          <ProteusElement element={result.data.body} />
        ),
        subtitle: hasValue(result.data.subtitle) && (
          <ProteusElement element={result.data.subtitle} />
        ),
        title: hasValue(result.data.title) && (
          <ProteusElement element={result.data.title} />
        ),
      }}
      strict={strict}
      {...props}
    />
  );
}

ProteusDocumentRenderer.displayName =
  "@optiaxiom/react/ProteusDocumentRenderer";

function hasValue(value: unknown): boolean {
  return !!value && (!Array.isArray(value) || value.length > 0);
}
