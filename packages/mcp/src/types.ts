/**
 * Complete metadata for a single component
 */
export interface ComponentInfo {
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
  /** Example title */
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
  /** Import statement example */
  import: string;
  /** Search keywords/tags for this icon */
  keywords: string[];
  /** Icon component name (e.g., "IconMessages") */
  name: string;
}

/**
 * Component prop definition
 */
export interface PropDefinition {
  /** Default value if not provided */
  default?: boolean | number | string;
  /** If deprecated, migration info */
  deprecated?: DeprecationInfo;
  /** Description of what this prop does */
  description?: string;
  /** Is this prop required? */
  required?: boolean;
  /** TypeScript type */
  type: string;
  /** For enum types, possible values */
  values?: Array<boolean | number | string>;
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
