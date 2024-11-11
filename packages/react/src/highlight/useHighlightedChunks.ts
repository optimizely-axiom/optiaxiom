import { useMemo } from "react";

export const useHighlightedChunks = (
  content: string,
  query?: RegExp | RegExp[] | string | string[],
) => {
  const terms = useMemo(
    () =>
      (Array.isArray(query) ? query : query ? [query] : [])
        .map((q) => (typeof q === "string" ? q.trim() : q))
        .filter(Boolean),
    [query],
  );
  if (terms.length === 0) {
    return [{ chunk: content, highlighted: false }];
  }

  const pattern = new RegExp(
    "(" +
      terms
        .map((term) =>
          term instanceof RegExp
            ? term.source
            : `(?![^<>]*>)(^|\\b)(?=[^/.])${escapeRegExp(term)}`,
        )
        .join("|") +
      ")",
    "gi",
  );
  return content
    .split(pattern)
    .map((chunk) => ({ chunk, highlighted: pattern.test(chunk) }));
};

function escapeRegExp(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
