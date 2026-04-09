import { type ComponentPropsWithoutRef } from "react";

import type { UseResource } from "./ProteusDocumentContext";

import { ProteusElement } from "../proteus-element";
import { ProteusDocumentShell } from "./ProteusDocumentShell";
import { safeParseDocument } from "./schemas";

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
  /**
   * Hook to resolve a resource URI to HTML content for Bridge elements
   */
  useResource?: UseResource;
};

type ProteusDocument = {
  $type: "Document";
  actions?: unknown;
  appIcon?: string;
  appName?: string;
  blocking?: boolean;
  body: unknown;
  subtitle?: unknown;
  title?: unknown;
  titleIcon?: string;
};

export function ProteusDocumentRenderer({
  element: elementProp,
  strict = false,
  useResource,
  ...props
}: ProteusDocumentRendererProps) {
  const result = safeParseDocument(elementProp);
  if (!result.success) {
    if (strict) {
      throw new Error(`Invalid document: ${result.error.join("\n")}`);
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
      useResource={useResource}
      {...props}
    />
  );
}

ProteusDocumentRenderer.displayName =
  "@optiaxiom/proteus/ProteusDocumentRenderer";

function hasValue(value: unknown): boolean {
  return !!value && (!Array.isArray(value) || value.length > 0);
}
