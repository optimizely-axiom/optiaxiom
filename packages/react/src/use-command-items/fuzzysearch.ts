/**
 * Based on https://github.com/bevacqua/fuzzysearch and modified with
 * Intl.Collator for unicode support.
 */

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  usage: "search",
});

export function fuzzysearch(haystack: string, needle: string) {
  const hlen = haystack.length;
  const nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charAt(i);
    while (j < hlen) {
      if (collator.compare(haystack.charAt(j++), nch) === 0) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}
