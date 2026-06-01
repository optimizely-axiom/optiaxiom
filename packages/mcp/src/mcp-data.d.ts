declare module "#mcp/data" {
  import type {
    ComponentInfo,
    DesignTokens,
    Guide,
    IconInfo,
    TestInfo,
  } from "./types.js";

  export const components: Record<string, ComponentInfo>;
  export const guides: Record<string, Guide>;
  export const icons: Record<string, IconInfo>;
  export const tests: Record<string, TestInfo>;
  export const tokens: DesignTokens;
}
