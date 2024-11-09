export const getHighlightedChunks = (content: string, terms: string[]) => {
  terms = terms.filter(Boolean);
  if (terms.length === 0) {
    return [{ chunk: content }];
  }

  const pattern = getAllPhrasesMatchingRegex(terms);
  const matches = content.matchAll(pattern);

  const chunks = [];
  let runningIndex = 0;
  for (const match of matches) {
    const startIndex = match.index;
    const endIndex = startIndex + match[0].length;

    if (startIndex > runningIndex) {
      chunks.push({ chunk: content.slice(runningIndex, startIndex) });
    }
    chunks.push({ chunk: match[0], highlighted: true });

    runningIndex = endIndex;
  }
  if (runningIndex < content.length) {
    chunks.push({ chunk: content.slice(runningIndex) });
  }

  return chunks;
};

function escapeRegExp(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

function getAllPhrasesMatchingRegex(phrases: string[]) {
  const escapedPhrases = phrases.map((p) => escapeRegExp(p));

  return new RegExp(
    "(?![^<>]*>)(^|\\b)(?=[^/.])(" + escapedPhrases.join("|") + ")",
    "gi",
  );
}
