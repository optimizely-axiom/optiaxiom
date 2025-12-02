import fuzzysearch from "fuzzysearch";

import type { ComponentInfo, IconInfo } from "./types.js";

export interface IconSearchOptions {
  icons: IconInfo[];
  limit?: number;
  query: string;
}

export interface SearchOptions {
  components: ComponentInfo[];
  limit?: number;
  query: string;
}

interface RelevanceScoreOptions {
  /** Optional description to search against */
  description?: string;
  /** Name to search against */
  name: string;
  /** Optional prefix to strip from name for better matching (e.g., "icon" for icon components) */
  namePrefix?: string;
  /** Search query */
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
      score: calculateRelevanceScore({
        description: component.description,
        name: component.name,
        query,
      }),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.component);
}

export function searchIcons({
  icons,
  limit = 10,
  query,
}: IconSearchOptions): IconInfo[] {
  if (!query.trim()) {
    return icons.slice(0, limit);
  }

  return icons
    .map((icon) => ({
      icon,
      score: calculateRelevanceScore({
        name: icon.name,
        namePrefix: "icon",
        query,
      }),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.icon);
}

function calculateRelevanceScore({
  description,
  name,
  namePrefix,
  query,
}: RelevanceScoreOptions): number {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedName = name.toLowerCase();
  const normalizedDescription = description?.toLowerCase();

  // Remove prefix from name if specified (e.g., "Icon" for icon components)
  const nameWithoutPrefix = namePrefix
    ? normalizedName.replace(new RegExp(`^${namePrefix}`, "i"), "")
    : normalizedName;

  // Split query into terms for multi-word support (OR logic)
  const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 0);

  // First check for exact match of full query
  if (
    normalizedName === normalizedQuery ||
    nameWithoutPrefix === normalizedQuery
  ) {
    return 100;
  }

  // Score based on how many terms match (OR logic)
  let totalScore = 0;
  let matchedTerms = 0;

  for (const term of terms) {
    let termScore = 0;

    // Check matches for this term
    if (normalizedName === term || nameWithoutPrefix === term) {
      termScore = 100;
    } else if (
      normalizedName.startsWith(term) ||
      nameWithoutPrefix.startsWith(term)
    ) {
      termScore = 75;
    } else if (
      normalizedName.includes(term) ||
      nameWithoutPrefix.includes(term)
    ) {
      termScore = 50;
    } else if (normalizedDescription?.includes(term)) {
      termScore = 25;
    } else if (
      fuzzysearch(term, normalizedName) ||
      fuzzysearch(term, nameWithoutPrefix)
    ) {
      termScore = 10;
    }

    if (termScore > 0) {
      matchedTerms++;
      totalScore += termScore;
    }
  }

  // No terms matched
  if (matchedTerms === 0) {
    return 0;
  }

  // Average score across matched terms, with bonus for matching more terms
  const averageScore = totalScore / matchedTerms;
  const matchRatio = matchedTerms / terms.length;

  // Boost score based on percentage of terms matched
  return averageScore * matchRatio;
}
