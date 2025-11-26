import { components } from "#data/components/index.js";
import metadata from "#data/metadata.json" with { type: "json" };
import tokens from "#data/tokens.json" with { type: "json" };

import type { ComponentInfo, DesignTokens, Metadata } from "./types.js";

export function getAllComponents(): ComponentInfo[] {
  return Object.values(components) as ComponentInfo[];
}

export function getComponent(name: string): ComponentInfo | null {
  const component = components[name as keyof typeof components];
  return (component as ComponentInfo) || null;
}

export function getMetadata(): Metadata {
  return metadata as Metadata;
}

export function getTokens(): DesignTokens {
  return tokens as DesignTokens;
}
