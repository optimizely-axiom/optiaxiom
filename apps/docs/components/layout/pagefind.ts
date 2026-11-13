export type SearchResult = { page: PagefindPage; section: PagefindSection };

type Pagefind = {
  debouncedSearch: (term: string) => Promise<null | PagefindResponse>;
  options: (options: { baseUrl: string }) => Promise<void>;
  search: (term: string) => Promise<PagefindResponse>;
};

type PagefindHit = {
  data: () => Promise<PagefindPage>;
  id: string;
  score: number;
};

type PagefindPage = {
  excerpt: string;
  meta: { title: string };
  sub_results: PagefindSection[];
  url: string;
};

type PagefindResponse = { results: PagefindHit[] };

type PagefindSection = {
  excerpt: string;
  title: string;
  url: string;
  weighted_locations: Array<{ balanced_score: number }>;
};

/**
 * Names other libraries use, searched alongside the query so they find the
 * Axiom page ("modal" finds Dialog). Keys are single lowercase words.
 */
const ALIASES: Record<string, string> = {
  accordion: "disclosure",
  autocomplete: "menu",
  chip: "pill",
  collapse: "disclosure",
  combobox: "menu",
  loader: "spinner",
  modal: "dialog",
  slider: "range",
  snackbar: "toast",
  toggle: "switch",
};

const MAX_PAGES = 10;
/** Pages fetched and re-ranked before keeping the top `MAX_PAGES`. */
const RANK_CANDIDATES = 20;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let pagefindPromise: Promise<Pagefind> | undefined;

export function pageTitle(page: PagefindPage) {
  return page.meta.title || toRoute(page.url);
}

/**
 * Search the docs and return one result per page, best first: the page itself
 * or its best-matching section. Resolves to `null` when a newer search
 * superseded this one.
 *
 * On top of Pagefind's own matching:
 * - Aliases search alongside the query ("modal" also searches "dialog").
 * - If every-word matching finds nothing, each word is searched on its own
 *   and pages matching more of them rank higher ("progress bar").
 * - A legacy page hands its score to its replacement, looking the replacement
 *   up if it didn't match ("DropdownMenu" finds Menu first), and still shows
 *   when it matches, but always below the current docs.
 */
export async function searchPages(
  query: string,
  legacyPages: Record<string, string>,
): Promise<null | SearchResult[]> {
  const pagefind = await loadPagefind();
  const response = await pagefind.debouncedSearch(query);
  if (!response) {
    return null;
  }

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = new Map<string, { hit: PagefindHit; score: number }>();
  const add = (results: PagefindHit[], weight: number, sum = false) => {
    for (const hit of results.slice(0, RANK_CANDIDATES)) {
      const score = hit.score * weight;
      const current = hits.get(hit.id)?.score ?? 0;
      hits.set(hit.id, {
        hit,
        score: sum ? current + score : Math.max(current, score),
      });
    }
  };
  add(response.results, 1);
  const aliases = [...new Set(words.flatMap((word) => ALIASES[word] ?? []))];
  for (const alias of aliases) {
    add((await pagefind.search(alias)).results, 0.9);
  }
  if (!response.results.length && words.length > 1) {
    for (const word of words) {
      add((await pagefind.search(word)).results, 0.5, true);
    }
    // Drop pages that only brush one word ("bar" matching "barrel").
    const top = Math.max(...[...hits.values()].map(({ score }) => score));
    for (const [id, { score }] of hits) {
      if (score < top * 0.3) {
        hits.delete(id);
      }
    }
  }

  const candidates = await Promise.all(
    [...hits.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, RANK_CANDIDATES)
      .map(async ({ hit, score }) => ({ page: await hit.data(), score })),
  );
  const scores = new Map(
    candidates.map(({ page, score }) => [
      toRoute(page.url),
      score * pageWeight(page, [query, ...aliases]),
    ]),
  );
  for (const { page } of [...candidates]) {
    const replacement = legacyPages[toRoute(page.url)];
    if (!replacement) {
      continue;
    }
    if (!scores.has(replacement)) {
      const found = await findPage(pagefind, replacement);
      if (!found) {
        continue;
      }
      candidates.push({ page: found, score: 0 });
      scores.set(replacement, 0);
    }
    scores.set(
      replacement,
      Math.max(scores.get(replacement)!, scores.get(toRoute(page.url))!),
    );
  }

  const isLegacy = (page: PagefindPage) => toRoute(page.url) in legacyPages;
  return candidates
    .map(({ page }) => page)
    .sort((a, b) => scores.get(toRoute(b.url))! - scores.get(toRoute(a.url))!)
    .slice(0, MAX_PAGES)
    .sort((a, b) => Number(isLegacy(a)) - Number(isLegacy(b)))
    .map((page) => ({ page, section: bestSection(page, words) }));
}

export function siteSection(route: string) {
  const section = route.split("/")[1];
  return section && section[0].toUpperCase() + section.slice(1);
}

/**
 * Pagefind's excerpt starts with the section heading ("Flex. Use flex prop…")
 * when it opens at the top of the section. The row already shows the title,
 * so drop it, stepping over the `<mark>` tags Pagefind wraps matches in.
 * Returns "" when nothing but the heading is left.
 */
export function stripTitle(excerpt: string, title: string) {
  const prefix = `${title}.`.toLowerCase();
  let tags = "";
  let i = 0;
  for (let j = 0; j < prefix.length; i++) {
    if (i >= excerpt.length) {
      return excerpt;
    }
    if (excerpt[i] === "<") {
      const end = excerpt.indexOf(">", i);
      tags += excerpt.slice(i, end + 1);
      i = end;
    } else if (excerpt[i].toLowerCase() === prefix[j]) {
      j++;
    } else {
      return excerpt;
    }
  }
  const rest = excerpt.slice(i).trim();
  return rest && tags + rest;
}

/**
 * Pagefind indexes the exported `.html` files, so map its URLs back to the
 * site's trailing-slash routes.
 */
export function toRoute(url: string) {
  const [path, hash] = url.split("#");
  const route = path
    .replace(/(^|\/)index\.html$/, "$1")
    .replace(/\.html$/, "")
    .replace(/\/?$/, "/");
  return hash ? `${route}#${hash}` : route;
}

/**
 * The page itself or its best section. Pagefind returns sections in page
 * order, so rank them by the sum of their match scores (which Pagefind weights
 * higher for headings). A section whose heading names a query word the page
 * title doesn't ("disable button" → Disabled state) wins over the page intro.
 */
function bestSection(page: PagefindPage, words: string[]) {
  const title = pageTitle(page).toLowerCase();
  // Query words the page title doesn't already cover, compared by their first
  // five letters so "disable" matches "Disabled".
  const extra = words
    .filter((word) => word.length >= 3 && !title.includes(word))
    .map((word) => word.slice(0, 5));
  const score = (section: PagefindSection) => {
    const matches = section.weighted_locations.reduce(
      (total, location) => total + location.balanced_score,
      0,
    );
    // Only whole words count ("close" doesn't match "DialogClose"), and the
    // boost grows with how much of the heading they cover, so "disable
    // button" picks "Disabled state" over "Disabled button links".
    const headingWords = section.title
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
    const covered = headingWords.filter((headingWord) =>
      extra.some((word) => headingWord.startsWith(word)),
    ).length;
    // A heading with nothing under it but subsections ("Changelog") has no
    // excerpt to show; it only wins when nothing else matched.
    const empty = !stripTitle(section.excerpt, section.title);
    return (
      matches *
      (1 + (4 * covered) / Math.max(headingWords.length, 1)) *
      (empty ? 0.01 : 1)
    );
  };
  return page.sub_results.reduce(
    (best, section) => (score(section) > score(best) ? section : best),
    page.sub_results[0] ?? {
      excerpt: page.excerpt,
      title: pageTitle(page),
      url: page.url,
      weighted_locations: [],
    },
  );
}

/** Find a page by route, searching the words of its slug. */
async function findPage(pagefind: Pagefind, route: string) {
  const slug = route.split("/").filter(Boolean).pop() ?? "";
  const { results } = await pagefind.search(slug.replace(/-/g, " "));
  for (const hit of results.slice(0, 5)) {
    const page = await hit.data();
    if (toRoute(page.url) === route) {
      return page;
    }
  }
  return undefined;
}

function loadPagefind() {
  if (!pagefindPromise) {
    const promise = import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ `${basePath}/_pagefind/pagefind.js`
    ).then(async (pagefind: Pagefind) => {
      await pagefind.options({ baseUrl: "/" });
      return pagefind;
    });
    // Retry on the next search rather than caching the failure.
    promise.catch(() => {
      if (pagefindPromise === promise) {
        pagefindPromise = undefined;
      }
    });
    pagefindPromise = promise;
  }
  return pagefindPromise;
}

/**
 * Re-weight Pagefind's page score: migration guides sink below the current
 * docs, and a page titled exactly as the query (or an alias of it) rises.
 */
function pageWeight(page: PagefindPage, terms: string[]) {
  const route = toRoute(page.url);
  let weight = 1;
  if (route.startsWith("/guides/") && route.includes("migration")) {
    weight *= 0.6;
  }
  const title = page.meta.title?.toLowerCase();
  if (terms.some((term) => term.trim().toLowerCase() === title)) {
    weight *= 1.5;
  }
  return weight;
}
