/**
 * Component category for organization
 */
export type ComponentCategory =
  | "layout"          // Box, Flex, Grid
  | "navigation"      // Nav, Breadcrumb, Tabs
  | "feedback"        // Alert, Badge, Spinner
  | "forms"           // Input, Select, Checkbox
  | "overlays"        // Dialog, Menu, Tooltip
  | "data-display"    // Table, List, Card
  | "utilities"       // Portal, VisuallyHidden
  | "typography"      // Text, Heading
  | "primitives";     // Low-level building blocks

/**
 * Deprecation information
 */
export interface DeprecationInfo {
  /** Version when deprecated */
  since: string;

  /** What to use instead */
  replacement?: string;

  /** Additional migration notes */
  notes?: string;
}

/**
 * Component prop definition
 */
export interface PropDefinition {
  /** TypeScript type */
  type: string;

  /** Is this prop required? */
  required?: boolean;

  /** Default value if not provided */
  default?: string | number | boolean;

  /** Description of what this prop does */
  description: string;

  /** For enum types, possible values */
  values?: Array<string | number>;

  /** If deprecated, migration info */
  deprecated?: DeprecationInfo;
}

/**
 * Code example
 */
export interface Example {
  /** Example title */
  title: string;

  /** Description of what this example demonstrates */
  description?: string;

  /** Full code example */
  code: string;

  /** Language (usually "tsx") */
  language?: string;

  /** Tags for filtering examples */
  tags?: string[];
}

/**
 * Accessibility information
 */
export interface AccessibilityInfo {
  /** ARIA role */
  role?: string;

  /** Keyboard interactions */
  keyboard?: string[];

  /** Screen reader notes */
  screenReader?: string;

  /** General accessibility notes */
  notes?: string;
}

/**
 * Complete metadata for a single component
 */
export interface ComponentMetadata {
  /** Component name (e.g., "Badge") */
  name: string;

  /** Package the component is exported from */
  package: "@optiaxiom/react" | "@optiaxiom/react/unstable";

  /** Component category for organization */
  category: ComponentCategory;

  /** Short description of the component's purpose */
  description: string;

  /** Import statement example */
  import: string;

  /** Component props definition */
  props: Record<string, PropDefinition>;

  /** Base types/interfaces this component extends */
  extends?: string[];

  /** Usage examples */
  examples: Example[];

  /** Related components */
  relatedComponents?: string[];

  /** Accessibility information */
  accessibility?: AccessibilityInfo;

  /** Version this component was introduced */
  since: string;

  /** If deprecated, when and what to use instead */
  deprecated?: DeprecationInfo;

  /** Keywords for search */
  keywords?: string[];

  /** Link to documentation */
  docsUrl?: string;

  /** Link to Figma component */
  figmaUrl?: string;
}

/**
 * Master index of all components
 */
export interface ComponentRegistry {
  /** Registry version (matches package version) */
  version: string;

  /** Generation timestamp */
  generatedAt: string;

  /** Total component count */
  componentCount: number;

  /** Components grouped by category */
  categories: Record<ComponentCategory, string[]>;

  /** All component names (alphabetical) */
  components: string[];

  /** Metadata about the registry */
  metadata: {
    packageVersion: string;
    schemaVersion: string;
  };
}
