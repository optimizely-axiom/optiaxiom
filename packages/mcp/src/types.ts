/**
 * Complete metadata for a single component
 */
export interface ComponentInfo {
  /** Accessibility section of the docs page: keyboard interactions and what the consumer must provide */
  accessibility?: string;
  /** Component categories for grouping and discovery (e.g., ["form", "input"]) */
  category?: string[];
  /** All components in this group (only present on primary component) */
  components?: string[];
  /** If deprecated, when and what to use instead */
  deprecated?: DeprecationInfo;
  /** Short description of the component's purpose */
  description: string;
  /** Link to documentation */
  docsUrl?: string;
  /** Narrowest entry point that exports this component, for consumers who skip the barrel */
  entryPoint?: string;
  /** Usage examples */
  examples?: Example[];
  /** Base types/interfaces this component extends */
  extends?: string[];
  /** Component group this belongs to (e.g., "AlertDialog") */
  group?: string;
  /** Import statement example */
  import: string;
  /** Component name (e.g., "Badge") */
  name: string;
  /** Component props definition */
  props: Record<string, PropDefinition>;
  /** Names of the props that must be passed */
  required?: string[];
  /** Version this component was introduced */
  since?: string;
}

/**
 * Deprecation information
 */
export interface DeprecationInfo {
  /** Component to use instead */
  replacement?: string;
  /** Version when deprecated */
  since: string;
}

/**
 * Design tokens from @optiaxiom/globals with px values for Figma conversion
 */
export interface DesignTokens {
  /** Border radius tokens (xs, sm, md, lg, xl, full) */
  borderRadius: Record<string, string>;
  /** Box shadow tokens (sm, md, lg) */
  boxShadow: Record<string, string>;
  /** Breakpoint min-widths (sm, md) used by responsive props; `base` applies below `sm` */
  breakpoints: Record<string, string>;
  /** Color tokens - semantic colors (light mode hex values for Figma) */
  colors: Record<string, string>;
  /** Transition duration tokens (sm, md, lg) */
  duration: Record<string, string>;
  /** Font family tokens (sans, mono) */
  fontFamily: Record<string, string>;
  /** Font size tokens with line heights */
  fontSize: Record<string, { fontSize: string; lineHeight: string }>;
  /** Max size tokens (xs, sm, md, lg) */
  maxSize: Record<string, string>;
  /** Size tokens (2xs, xs, sm, md, lg, xl, 3xl) - used for width/height */
  size: Record<string, string>;
  /** Z-index tokens (popover, toast, tooltip) */
  zIndex: Record<string, string>;
}

/**
 * Code example
 */
export interface Example {
  /** Source files for this example, in display order (App.tsx first). */
  code: ExampleFile[];
  /** Axiom component names imported in this example */
  components: string[];
  /** Docs prose introducing the example */
  description?: string;
  /** Docs heading the example sits under (e.g. "Pagination > Client side") */
  heading?: string;
  /** Example title (its demo folder name) */
  title: string;
}

export interface ExampleFile {
  /** File contents */
  content: string;
  /** File name (e.g. "App.tsx") */
  filename: string;
}

/**
 * Guide information
 */
export interface Guide {
  /** Guide content in markdown */
  content: string;
  /** Guide name (kebab-case) */
  name: string;
  /** Guide title */
  title: string;
}

/**
 * Icon information
 */
export interface IconInfo {
  /** Entry point that exports only this icon, for consumers who skip the barrel */
  entryPoint: string;
  /** Import statement example */
  import: string;
  /** Search keywords/tags for this icon */
  keywords: string[];
  /** Icon component name (e.g., "IconMessages") */
  name: string;
}

/**
 * Component prop definition: JSON Schema keywords plus docs
 */
export interface PropDefinition extends TypeSchema {
  /** Default value if not provided */
  default?: boolean | number | string;
  /** If deprecated, migration info */
  deprecated?: DeprecationInfo;
  /** Accepts per-breakpoint values: `{ base, sm, md }` or `[base, sm, md]` */
  responsive?: boolean;
}

/**
 * Vetted test file for a component, used as a reference pattern for AI-generated
 * tests.
 */
export interface TestInfo {
  /** Axiom component names imported in this test */
  components: string[];
  /** Component name this test belongs to (e.g., "Alert") */
  name: string;
  /** Test file source code */
  source: string;
}

/**
 * JSON Schema keywords describing a type
 */
export interface TypeSchema {
  /** Schema of each value of a record keyed by strings */
  additionalProperties?: TypeSchema;
  /** Matches any of these schemas */
  anyOf?: TypeSchema[];
  /** What this prop or field does */
  description?: string;
  /** Allowed literal values */
  enum?: Array<boolean | number | string>;
  /** Schema of each array element */
  items?: TypeSchema;
  /** Fields of an object */
  properties?: Record<string, PropDefinition>;
  /** Names of the fields an object must have */
  required?: string[];
  /** Name of an object type (e.g. `SelectOption`) */
  title?: string;
  /** TypeScript type, where JSON Schema can't express it (functions, `ReactNode`, generics) */
  tsType?: string;
  /** JSON type, a `TypeSchemaType` (typed `string` because JSON imports widen literals) */
  type?: string | string[];
}

export type TypeSchemaType =
  | "array"
  | "boolean"
  | "null"
  | "number"
  | "object"
  | "string";
