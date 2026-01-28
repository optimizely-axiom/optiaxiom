/**
 * Validation utilities for Block Document elements
 *
 * Provides functions for validating Block documents and elements using Zod schemas.
 * Implements graceful degradation and error logging as per Opal Block specification.
 */

import type { ReactNode } from "react";

import { z } from "zod";

import type { BlockDocumentElement, BlockElement } from "./types";

import { Box } from "../box";
import { Card } from "../card";
import { Text } from "../text";
import {
  BlockActionDataSchema,
  BlockDocumentElementSchema,
  BlockElementSchema,
  BlockNodeSchema,
} from "./schemas";

// ============================================================================
// Types
// ============================================================================

export type ValidationFailure = {
  error: z.ZodError;
  success: false;
};

export type ValidationResult<T> = ValidationFailure | ValidationSuccess<T>;

export type ValidationSuccess<T> = {
  data: T;
  success: true;
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Renders fallback display when document validation completely fails
 *
 * Per Opal Block specification section 4.4:
 * "For complete failures, show fallback display with data field as JSON"
 *
 * @param data - The invalid data to display
 * @returns React node showing formatted JSON
 *
 * @example
 * if (!validationResult.success) {
 *   return renderFallbackDisplay(element);
 * }
 */
export function renderFallbackDisplay(data: unknown): ReactNode {
  return (
    <Card flexDirection="column" gap="16" w="full">
      <Text color="fg.secondary">
        Unable to render Block document. Document data:
      </Text>
      <Box
        asChild
        bg="bg.secondary"
        fontSize="sm"
        overflow="auto"
        p="12"
        rounded="sm"
        w="full"
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </Card>
  );
}

/**
 * Validates a complete Block document with partial rendering support
 *
 * Pre-filters invalid children and actions to enable graceful degradation.
 * Valid elements render even when some siblings are invalid.
 *
 * @param element - The document to validate (unknown type for safety)
 * @returns Validation result with typed data or error details
 *
 * @example
 * const result = validateBlockDocument(data);
 * if (result.success) {
 *   console.log('Valid document:', result.data);
 * } else {
 *   console.error('Invalid document:', result.error);
 * }
 */
export function validateBlockDocument(
  element: unknown,
): ValidationResult<BlockDocumentElement> {
  // First check if element has basic document structure
  if (
    !element ||
    typeof element !== "object" ||
    !("$type" in element) ||
    element.$type !== "Block.Document"
  ) {
    const error = new z.ZodError([
      {
        code: "custom",
        message: "Invalid Block.Document structure",
        path: [],
      },
    ]);
    logValidationError("Block.Document", error, element);
    return { error, success: false };
  }

  // Create a deep copy to avoid mutating the original element
  const documentData = structuredClone(element) as Record<string, unknown>;

  if (Array.isArray(documentData.children)) {
    documentData.children = filterValidItems(
      documentData.children,
      BlockNodeSchema,
      "Block.Document child",
    );
  }

  if (Array.isArray(documentData.actions)) {
    documentData.actions = filterValidItems(
      documentData.actions,
      BlockActionDataSchema,
      "Block.Document action",
    );
  }

  const result = BlockDocumentElementSchema.safeParse(documentData);

  if (!result.success) {
    logValidationError("Block.Document", result.error, documentData);
    return { error: result.error, success: false };
  }

  // Type assertion needed: Zod's inferred type may differ slightly from our TS types
  return { data: result.data as BlockDocumentElement, success: true };
}

/**
 * Validates an individual Block element
 *
 * @param element - The element to validate (unknown type for safety)
 * @param index - Optional index for error reporting
 * @returns Validation result with typed data or error details
 *
 * @example
 * const result = validateBlockElement(data, 5);
 * if (result.success) {
 *   renderElement(result.data);
 * } else {
 *   // Skip invalid element
 *   return null;
 * }
 */
export function validateBlockElement(
  element: unknown,
  index?: number,
): ValidationResult<BlockElement> {
  const result = BlockElementSchema.safeParse(element);

  if (!result.success) {
    const context = index !== undefined ? ` at index ${index}` : "";
    logValidationError(`Block element${context}`, result.error, element);
    return { error: result.error, success: false };
  }

  // Type assertion needed: Zod's inferred type may differ slightly from our TS types
  return { data: result.data as BlockElement, success: true };
}

// ============================================================================
// Fallback Display
// ============================================================================

/**
 * Filters an array of items, keeping only those that pass schema validation
 *
 * Invalid items are logged but not included in the result, enabling
 * graceful degradation and partial rendering.
 *
 * @param items - Array of items to validate
 * @param schema - Zod schema to validate each item against
 * @param contextPrefix - Context description for error logging (e.g., "Block.Document child")
 * @returns Array containing only valid items
 */
function filterValidItems<T>(
  items: unknown[],
  schema: z.ZodType<T>,
  contextPrefix: string,
): unknown[] {
  const validItems: unknown[] = [];
  items.forEach((item, index) => {
    const result = schema.safeParse(item);
    if (result.success) {
      validItems.push(item);
    } else {
      // Log but don't fail - graceful degradation
      logValidationError(
        `${contextPrefix} at index ${index}`,
        result.error,
        item,
      );
    }
  });
  return validItems;
}

/**
 * Logs validation errors to console for monitoring
 *
 * Formats errors with structured information:
 * - Context (what was being validated)
 * - Detailed error list from Zod
 * - Original data for debugging
 *
 * @param context - Description of what was being validated
 * @param error - Zod validation error
 * @param data - Original data that failed validation
 */
function logValidationError(
  context: string,
  error: z.ZodError,
  data: unknown,
): void {
  console.error(`[Block Document Validation] Invalid ${context}:`, {
    data,
    errors: error.errors.map((err) => ({
      code: err.code,
      message: err.message,
      path: err.path.join("."),
    })),
  });
}
