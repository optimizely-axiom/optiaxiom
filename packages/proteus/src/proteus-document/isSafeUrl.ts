/**
 * Whether a URL is safe to hand to `window.open` from a document-triggered
 * action (`openLink` / `download`).
 *
 * Documents — and now scripts, via `ctx.emit` — supply these URLs, so we only
 * allow navigable web schemes and reject dangerous ones like `javascript:`
 * (script injection) and `data:` (can host arbitrary HTML/JS in a new tab).
 * Relative URLs are resolved against the current document.
 */
export function isSafeUrl(url: unknown): url is string {
  if (typeof url !== "string") {
    return false;
  }
  let parsed;
  try {
    parsed = new URL(url, window.location.href);
  } catch {
    return false;
  }
  return parsed.protocol === "http:" || parsed.protocol === "https:";
}
