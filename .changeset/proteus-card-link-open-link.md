---
"@optiaxiom/proteus": patch
---

`ProteusCardLink` now dispatches a bare `href` through the shell's event pipeline as an `{ action: "openLink", url }` event, so hosts that own link navigation via `onOpenLink` (added in the previous release: MCP Apps `app.openLink`, OpenAI Apps SDK `window.openai.openExternal`) receive href-only clicks the same as explicit `onClick` actions. Without this, `CardLink { href }` in sandboxed iframes without `allow-popups` fell through to the browser's blocked `target="_blank"` navigation, bypassing the host handler. Behaviour is unchanged when `onClick` is provided, and outside embedded shells the shell's `window.open(url, "_blank", "noopener,noreferrer")` fallback still runs — so this is a non-breaking addition.
