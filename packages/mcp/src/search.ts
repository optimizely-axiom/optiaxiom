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

  // Split query into terms for multi-word support (OR logic)
  const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 0);

  // First check for exact match of full query
  if (name === normalizedQuery) {
    return 100;
  }

  // Score based on how many terms match (OR logic)
  let totalScore = 0;
  let matchedTerms = 0;

  for (const term of terms) {
    let termScore = 0;

    // Check matches for this term
    if (name === term) {
      termScore = 100;
    } else if (name.startsWith(term)) {
      termScore = 75;
    } else if (name.includes(term)) {
      termScore = 50;
    } else if (description.includes(term)) {
      termScore = 25;
    } else if (fuzzysearch(term, name)) {
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
