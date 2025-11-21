/**
 * Pattern category
 */
export type PatternCategory =
  | "layout"
  | "forms"
  | "navigation"
  | "data-display"
  | "feedback"
  | "composition";

/**
 * Common usage patterns and best practices
 */
export interface Pattern {
  /** Pattern name (e.g., "Form Layout", "Navigation Menu") */
  name: string;

  /** Category */
  category: PatternCategory;

  /** Description of when to use this pattern */
  description: string;

  /** Components used in this pattern */
  components: string[];

  /** Full code example */
  code: string;

  /** Key points about this pattern */
  notes?: string[];

  /** Do's and Don'ts */
  guidelines?: {
    do: string[];
    dont: string[];
  };

  /** Related patterns */
  related?: string[];
}
