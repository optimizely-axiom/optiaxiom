/**
 * Zod runtime validation schemas for Block Document elements
 *
 * Mirrors the TypeScript types in types.ts with runtime validation.
 * Used for validating JSON data from external sources.
 *
 * @see types.ts for TypeScript type definitions
 * @see validation.tsx for validation helper functions
 */

import { z } from "zod";

// ============================================================================
// Forward Declarations
// ============================================================================

// Declare the recursive schema ahead of time to avoid circular reference issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlockNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.string(),
    BlockElementSchema,
    z.array(z.union([z.string(), BlockElementSchema])),
  ]),
);

// ============================================================================
// Individual Element Schemas
// ============================================================================

/**
 * Block.Text element schema
 */
const BlockTextElementSchema = z.object({
  $type: z.literal("Block.Text"),
  children: BlockNodeSchema,
  color: z.enum(["default", "secondary", "tertiary"]).optional(),
});

/**
 * Block.Heading element schema
 */
const BlockHeadingElementSchema = z.object({
  $type: z.literal("Block.Heading"),
  children: BlockNodeSchema,
  level: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
    .optional(),
});

/**
 * Block.Input element schema
 */
const BlockInputElementSchema = z.object({
  $type: z.literal("Block.Input"),
  name: z.string().min(1, { message: "Input name cannot be empty" }),
  placeholder: z.string().optional(),
  value: z.string().optional(),
});

/**
 * Block.Textarea element schema
 */
const BlockTextareaElementSchema = z.object({
  $type: z.literal("Block.Textarea"),
  name: z.string().min(1, { message: "Textarea name cannot be empty" }),
  placeholder: z.string().optional(),
  rows: z.number().positive().int().optional(),
  value: z.string().optional(),
});

/**
 * Block.Field element schema
 */
const BlockFieldElementSchema = z.object({
  $type: z.literal("Block.Field"),
  children: BlockNodeSchema,
  description: z.string().optional(),
  error: z.string().optional(),
  info: z.string().optional(),
  label: z.string().optional(),
  required: z.boolean().optional(),
});

/**
 * Block.Group element schema
 */
const BlockGroupElementSchema = z.object({
  $type: z.literal("Block.Group"),
  children: BlockNodeSchema,
  flexDirection: z.enum(["horizontal", "vertical"]).optional(),
  gap: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
});

// ============================================================================
// Union Schemas
// ============================================================================

/**
 * Union of all Block body elements
 */
const BlockElementSchema = z.discriminatedUnion("$type", [
  BlockFieldElementSchema,
  BlockGroupElementSchema,
  BlockHeadingElementSchema,
  BlockInputElementSchema,
  BlockTextareaElementSchema,
  BlockTextElementSchema,
]);

// Export all schemas
export {
  BlockElementSchema,
  BlockFieldElementSchema,
  BlockGroupElementSchema,
  BlockHeadingElementSchema,
  BlockInputElementSchema,
  BlockNodeSchema,
  BlockTextareaElementSchema,
  BlockTextElementSchema,
};

// ============================================================================
// Action Schemas
// ============================================================================

/**
 * Block.Action element schema
 */
export const BlockActionElementSchema = z.object({
  $type: z.literal("Block.Action"),
  appearance: z
    .enum([
      "danger",
      "default",
      "primary",
      "subtle",
      "primary-opal",
      "default-opal",
    ])
    .optional(),
  children: BlockNodeSchema,
  name: z.string().min(1, { message: "Action name cannot be empty" }),
});

/**
 * Block.CancelAction element schema
 */
export const BlockCancelActionElementSchema = z.object({
  $type: z.literal("Block.CancelAction"),
  children: BlockNodeSchema,
});

/**
 * Union of action elements
 */
export const BlockActionDataSchema = z.discriminatedUnion("$type", [
  BlockActionElementSchema,
  BlockCancelActionElementSchema,
]);

// ============================================================================
// Document Schema
// ============================================================================

/**
 * Block.Document root element schema
 */
export const BlockDocumentElementSchema = z.object({
  $type: z.literal("Block.Document"),
  actions: z.array(BlockActionDataSchema).optional(),
  blocking: z.boolean().optional(),
  children: z.array(BlockNodeSchema),
  version: z.literal("1.0"),
});
