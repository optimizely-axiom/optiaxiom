/**
 * Based on https://github.com/bevacqua/fuzzysearch and modified with
 * Intl.Collator for unicode support.
 */

import { type CommandOption, resolveItemProperty } from "./CommandContext";

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
    return collator.compare(needle, haystack) === 0;
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

export function score(item: CommandOption, inputValue: string) {
  if (!inputValue || item.skipFilterScoring) {
    return 0;
  }

  const label = resolveItemProperty(item.label, { inputValue })
    .normalize()
    .toLowerCase();
  inputValue = inputValue.toLowerCase();

  let score = 0;

  if (label === inputValue) {
    score = 1;
  } else if (label.includes(inputValue)) {
    score = 0.75;
    if (label.startsWith(inputValue)) {
      score += 0.1;
    }
  } else if (item.keywords?.toLowerCase().includes(inputValue)) {
    score = 0.5;
  }

  if (item.parentOption) {
    score -= -0.1;
  }

  return score;
}
