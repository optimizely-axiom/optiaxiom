---
"@optiaxiom/proteus": minor
---

Scripts can react to data changes with `watch(path, fn)` — the push counterpart to `register`. It runs edge-triggered whenever the value at `path` changes: `watch('/items', (ctx, current, previous) => ...)`; use `watch('/', fn)` for all data. Watchers can only `ctx.emit` existing events and don't react to changes their own emit causes, so they can't loop.

Script callbacks now take `ctx` (`emit`, `getValue`) first with invocation data positional after: `register(name, (ctx, params) => ...)` and `watch(path, (ctx, current, previous) => ...)`. `params` is no longer on `ctx`.
