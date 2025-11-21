import fuzzysearch from "fuzzysearch";

import type { ComponentInfo } from "./types.js";

export interface SearchOptions {
  components: ComponentInfo[];
  limit?: number;
  query: string;
}

export function searchComponents({
  components,
  limit = 10,
  query,
}: SearchOptions): ComponentInfo[] {
  if (!query.trim()) {
    return components.slice(0, limit);
  }

  return components
    .map((component) => ({
      component,
      score: calculateRelevanceScore(component, query),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.component);
}

function calculateRelevanceScore(
  component: ComponentInfo,
  query: string,
): number {
  const normalizedQuery = query.toLowerCase().trim();
  const name = component.name.toLowerCase();
  const description = component.description.toLowerCase();

  // Exact match - highest priority
  if (name === normalizedQuery) {
    return 100;
  }

  // Starts with query - high priority
  if (name.startsWith(normalizedQuery)) {
    return 75;
  }

  // Contains query - medium priority
  if (name.includes(normalizedQuery)) {
    return 50;
  }

  // Description contains query - lower priority
  if (description.includes(normalizedQuery)) {
    return 25;
  }

  // Fuzzy match on name - lowest priority
  if (fuzzysearch(normalizedQuery, name)) {
    return 10;
  }

  // No match
  return 0;
}
