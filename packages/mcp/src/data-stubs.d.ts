/**
 * Type declarations for generated data that lives in ../data/
 *
 * These declarations allow TypeScript to compile even when the data/ directory
 * doesn't exist yet (e.g., on fresh clone before running `pnpm generate`).
 *
 * The actual data files are generated at build time by scripts/main.ts
 */

declare module "#data/components/index.js" {
  import type { ComponentInfo } from "./types.js";

  export const components: Record<string, ComponentInfo>;
  export type ComponentName = string;
}

declare module "#data/metadata.json" {
  import type { Metadata } from "./types.js";

  const metadata: Metadata;
  export default metadata;
}

declare module "#data/tokens.json" {
  import type { DesignTokens } from "./types.js";

  const tokens: DesignTokens;
  export default tokens;
}
