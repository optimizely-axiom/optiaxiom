import type {
  ComponentInfo,
  DesignTokens,
  Guide,
  IconInfo,
  TestInfo,
} from "./types.js";

import data from "./data.json";

const { guides, icons, tests, tokens } = data;
const components: Record<string, ComponentInfo> = data.components;

export function getAllComponents(): ComponentInfo[] {
  return Object.values(components);
}

export function getAllGuides(): Guide[] {
  return Object.values(guides);
}

export function getAllIcons(): IconInfo[] {
  return Object.values(icons);
}

export function getAllTests(): TestInfo[] {
  return Object.values(tests);
}

export function getComponent(name: string): ComponentInfo | null {
  return components[name] ?? null;
}

export function getGuide(name: string): Guide | null {
  return guides[name as keyof typeof guides] || null;
}

export function getTokens(): DesignTokens {
  return tokens;
}
