import {
  components as componentsData,
  guides as guidesData,
  icons as iconsData,
  tests as testsData,
  tokens as tokensData,
} from "#mcp/data";

import type {
  ComponentInfo,
  DesignTokens,
  Guide,
  IconInfo,
  TestInfo,
} from "./types.js";

export const components: Record<string, ComponentInfo> = componentsData;
export const guides: Record<string, Guide> = guidesData;
export const icons: Record<string, IconInfo> = iconsData;
export const tests: Record<string, TestInfo> = testsData;
export const tokens: DesignTokens = tokensData;
