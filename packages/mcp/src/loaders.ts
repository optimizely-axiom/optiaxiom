import { components, guides, icons, metadata, tokens } from "#mcp/data";

import type {
  ComponentInfo,
  DesignTokens,
  Guide,
  IconInfo,
  Metadata,
} from "./types.js";

export function getAllComponents(): ComponentInfo[] {
  return Object.values(components) as ComponentInfo[];
}

export function getAllGuides(): Guide[] {
  return Object.values(guides) as Guide[];
}

export function getAllIcons(): IconInfo[] {
  return Object.values(icons) as IconInfo[];
}

export function getComponent(name: string): ComponentInfo | null {
  const component = components[name as keyof typeof components];
  return (component as ComponentInfo) || null;
}

export function getGuide(name: string): Guide | null {
  const guide = guides[name as keyof typeof guides];
  return (guide as Guide) || null;
}

export function getMetadata(): Metadata {
  return metadata as Metadata;
}

export function getTokens(): DesignTokens {
  return tokens as DesignTokens;
}
