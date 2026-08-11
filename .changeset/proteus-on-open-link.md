---
"@optiaxiom/proteus": minor
---

Added `onOpenLink` prop to `ProteusDocumentShell`. When provided, the host handles navigation for `openLink` actions (receiving `{ url }`) instead of the built-in `window.open("_blank")` fallback. This unblocks embedded shells where `window.open` is blocked or opens in the wrong frame — MCP widget iframes (sandboxed without `allow-popups`), OpenAI Apps SDK hosts (route via `window.openai.openExternal`), and native shells (route via `app.openLink`). Behaviour is unchanged when the prop is absent — the shell still calls `window.open` as before, so this is a non-breaking addition. The `isSafeUrl` guard runs before either path.
