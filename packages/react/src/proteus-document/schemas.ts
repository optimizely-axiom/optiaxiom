// This file is auto-generated. Do not edit manually.
// Run `pnpm proteus-spec` to regenerate.

import { Validator } from "@cfworker/json-schema";

import proteusDocumentSpec from "./proteus-document-spec.json";

// --- ProteusEventHandler ---

export interface ProteusDocument {
  $type: "Document";
  [key: string]: unknown;
  actions?: unknown;
  appIcon?: string;
  appName: string;
  blocking?: boolean;
  body: unknown;
  subtitle?: string;
  title: string;
}

// --- ProteusDocument ---

export type ProteusElement =
  | { $type: "Action"; [key: string]: unknown }
  | { $type: "CancelAction"; [key: string]: unknown }
  | { $type: "Field"; [key: string]: unknown }
  | { $type: "Group"; [key: string]: unknown }
  | { $type: "Heading"; [key: string]: unknown }
  | { $type: "Image"; [key: string]: unknown }
  | { $type: "Input"; [key: string]: unknown }
  | { $type: "Link"; [key: string]: unknown }
  | { $type: "Map"; [key: string]: unknown }
  | { $type: "Range"; [key: string]: unknown }
  | { $type: "Select"; [key: string]: unknown }
  | { $type: "SelectContent"; [key: string]: unknown }
  | { $type: "SelectTrigger"; [key: string]: unknown }
  | { $type: "Separator"; [key: string]: unknown }
  | { $type: "Show"; [key: string]: unknown }
  | { $type: "Text"; [key: string]: unknown }
  | { $type: "Textarea"; [key: string]: unknown }
  | { $type: "Value"; [key: string]: unknown };

// --- ProteusElement (discriminated union for switch exhaustiveness) ---

export type ProteusEventHandler = { message: string } | { tool: string };

// --- safeParse ---

const documentValidator = new Validator(
  {
    $ref: "#/definitions/ProteusDocument",
    definitions: proteusDocumentSpec.definitions,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  "7",
);

const elementValidator = new Validator(
  {
    $ref: "#/definitions/ProteusNode",
    definitions: proteusDocumentSpec.definitions,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  "7",
);

type SafeParseResult<T> =
  | { data: T; success: true }
  | { error: unknown[]; success: false };

export function safeParseDocument({
  actions,
  body,
  ...data
}: Record<string, unknown>): SafeParseResult<ProteusDocument> {
  const result = documentValidator.validate({ body: [], ...data });
  if (result.valid) {
    return {
      data: { actions, body, ...data } as ProteusDocument,
      success: true,
    };
  }
  return { error: result.errors, success: false };
}

export function safeParseElement({
  children,
  ...data
}: Record<string, unknown>): SafeParseResult<ProteusElement> {
  const result = elementValidator.validate(data);
  if (result.valid) {
    return {
      data: { children, ...data } as unknown as ProteusElement,
      success: true,
    };
  }
  return { error: result.errors, success: false };
}
