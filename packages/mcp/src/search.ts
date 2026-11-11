import fuzzysearch from "fuzzysearch";

import type {
  ComponentInfo,
  DeprecationInfo,
  Example,
  IconInfo,
  PropDefinition,
  TestInfo,
} from "./types.js";

export interface ExampleSearchOptions {
  /** Space-separated component names to match */
  components: string;
  /** All components to search through */
  data: ComponentInfo[];
  /** Maximum number of examples to return */
  limit?: number;
  /** Search within example titles */
  query?: string;
}

export interface IconSearchOptions {
  icons: IconInfo[];
  limit?: number;
  query: string;
}

export interface PropSearchOptions {
  /** Maximum number of props to return */
  limit?: number;
  /** All props to search through */
  props: Record<string, PropDefinition>;
  /** Search query (e.g., "appearance size", "padding background") */
  query: string;
}

export interface SearchOptions {
  /** Optional category filter to narrow results */
  category?: string;
  components: ComponentInfo[];
  limit?: number;
  query: string;
}

export interface TestSearchOptions {
  /** Space-separated component names to match (omit to return all tests) */
  components?: string;
  /** All tests to search through */
  data: TestInfo[];
  /** Maximum number of tests to return */
  limit?: number;
}

interface RelevanceScoreOptions {
  /** Whether the item is deprecated */
  deprecated?: boolean;
  /** Optional description to search against */
  description?: string;
  /** Optional keyword tags to search against (exact match scores higher than description) */
  keywords?: string[];
  /** Name to search against */
  name: string;
  /** Optional prefix to strip from name for better matching (e.g., "icon" for icon components) */
  namePrefix?: string;
  /** Search query */
  query: string;
}

export function searchComponents({
  category,
  components,
  limit = 5,
  query,
}: SearchOptions): ComponentInfo[] {
  // Filter by category first if specified
  let filteredComponents = components;
  if (category) {
    const normalizedCategory = category.toLowerCase();
    filteredComponents = components.filter((component) =>
      component.category?.some(
        (cat) => cat.toLowerCase() === normalizedCategory,
      ),
    );
  }

  if (!query.trim()) {
    return filteredComponents.slice(0, limit);
  }

  return filteredComponents
    .map((component) => ({
      component,
      score: calculateRelevanceScore({
        deprecated: !!component.deprecated,
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

export function searchExamples({
  components,
  data,
  limit = 5,
  query,
}: ExampleSearchOptions): Array<
  Pick<Example, "code" | "title"> & {
    deprecated?: Array<DeprecationInfo & { name: string }>;
  }
> {
  const requested = components.trim().split(/\s+/);
  const queryTerms = query
    ?.toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  // Deprecated component name -> deprecation info, so we can flag when an
  // example composes one (e.g. DropdownMenu) and point at its replacement.
  const deprecations = new Map(
    data
      .filter((component) => component.deprecated)
      .map((c) => [c.name, c.deprecated as DeprecationInfo]),
  );

  const ranked = data
    .flatMap((component) =>
      (component.examples ?? []).flatMap((example) => {
        // A component's own demos match it even when their code reaches it
        // indirectly (e.g. ToastProvider demos only import `toaster`).
        const matches = requested.filter(
          (c) => c === component.name || example.components.includes(c),
        ).length;
        const queryMatches =
          queryTerms?.filter((term) =>
            example.title.toLowerCase().includes(term),
          ).length ?? 0;
        return matches > 0 && (!queryTerms?.length || queryMatches > 0)
          ? [
              {
                component: component.name,
                example,
                matches,
                queryMatches,
                tieBreak: scoreExampleTieBreak(
                  component.name,
                  example,
                  requested,
                ),
              },
            ]
          : [];
      }),
    )
    .sort(compareExamples);

  return promoteUsageDemos(ranked, requested)
    .slice(0, limit)
    .map(({ component, example }) => {
      const deprecated = example.components
        .filter((name) => deprecations.has(name))
        .map((name) => ({
          name,
          ...(deprecations.get(name) as DeprecationInfo),
        }));
      return {
        code: example.code,
        ...(deprecated.length ? { deprecated } : {}),
        title: `${component}/${example.title}`,
      };
    });
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
        keywords: icon.keywords,
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

export function searchProps({
  limit = 5,
  props,
  query,
}: PropSearchOptions): Record<string, PropDefinition> {
  if (!query.trim()) {
    return {};
  }

  const results = Object.entries(props)
    .map(([name, definition]) => ({
      definition,
      name,
      score: calculateRelevanceScore({
        description: definition.description ?? undefined,
        name,
        query,
      }),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return Object.fromEntries(
    results.map(({ definition, name }) => [name, definition]),
  );
}

export function searchTests({
  components,
  data,
  limit = 5,
}: TestSearchOptions): TestInfo[] {
  // Listing all tests is a discovery call — return every test, ignoring
  // `limit`, so the advertised "list all available reference test files"
  // contract holds. `limit` only bounds ranked search results below.
  if (!components?.trim()) {
    return data;
  }

  const requested = components.trim().split(/\s+/);

  return data
    .map((test) => {
      const matches = requested.filter((c) =>
        test.components.includes(c),
      ).length;
      // More matched components first; bonus when the test is owned by a
      // requested component; penalize tests pulling in unrelated components.
      const score =
        matches * 20 +
        (requested.includes(test.name) ? 15 : 0) -
        test.components.length;
      return { matches, score, test };
    })
    .filter((entry) => entry.matches > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.test);
}

function calculateRelevanceScore({
  deprecated,
  description,
  keywords,
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
    } else if (keywords?.some((kw) => kw === term)) {
      termScore = 40;
    } else if (keywords?.some((kw) => kw.includes(term))) {
      termScore = 30;
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
  let score = averageScore * matchRatio;

  // Penalize deprecated items so active alternatives rank higher
  if (deprecated) {
    score -= 20;
  }

  return score;
}

/**
 * Rank examples by, in order: query terms matched in the title, requested
 * components the example contains, then the tie-breakers. Compared key by key
 * so a tie-breaker can never lift an example that covers fewer of the
 * requested components above one that covers more; only
 * {@link promoteUsageDemos} does that, for usage demos.
 */
function compareExamples(
  a: { matches: number; queryMatches: number; tieBreak: number },
  b: { matches: number; queryMatches: number; tieBreak: number },
): number {
  return (
    b.queryMatches - a.queryMatches ||
    b.matches - a.matches ||
    b.tieBreak - a.tieBreak
  );
}

/**
 * Keep each requested component's own `usage` demo in view: within each run
 * of equal query matches, the best-ranked example leads, then those usage
 * demos in the order the components were requested, then the rest. A usage
 * demo the query filtered out is never added back.
 */
function promoteUsageDemos<
  T extends { component: string; example: Example; queryMatches: number },
>(ranked: T[], requested: string[]): T[] {
  const result: T[] = [];
  for (let start = 0; start < ranked.length;) {
    let end = start;
    while (ranked[end]?.queryMatches === ranked[start]?.queryMatches) {
      end++;
    }
    const [best, ...rest] = ranked.slice(start, end);
    const usage = [...new Set(requested)].flatMap((name) =>
      rest.filter(
        (entry) => entry.component === name && entry.example.title === "usage",
      ),
    );
    result.push(
      ...(best ? [best] : []),
      ...usage,
      ...rest.filter((entry) => !usage.includes(entry)),
    );
    start = end;
  }
  return result;
}

function scoreExampleTieBreak(
  component: string,
  example: Example,
  requested: string[],
): number {
  let score = 0;

  // Example is owned by a requested component (not just importing it)
  if (requested.includes(component)) {
    score += 15;
  }

  // Canonical "usage" examples are the primary docs demos
  if (example.title === "usage") {
    score += 10;
  }

  // Prefer focused examples (fewer unrelated components)
  score -= example.components.length;

  return score;
}
