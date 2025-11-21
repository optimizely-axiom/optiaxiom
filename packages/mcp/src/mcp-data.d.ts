declare module "#mcp/data" {
  import type {
    ComponentInfo,
    DesignTokens,
    Guide,
    Metadata,
  } from "./types.js";

  export const components: Record<string, ComponentInfo>;
  export const guides: Record<string, Guide>;
  export const metadata: Metadata;
  export const tokens: DesignTokens;
}
