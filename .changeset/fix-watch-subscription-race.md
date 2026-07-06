---
"@optiaxiom/proteus": patch
---

Fix `watch(path, fn)` script watchers missing edges that happened during startup. The worker reports its watched paths asynchronously after init; if the user changed the watched data before that message arrived, the change was swallowed and the watcher never fired. The watcher now seeds its baseline from the mount-time data and runs an immediate edge-detect the moment its paths are registered, so any change made during the async handshake fires correctly. `register` handlers and watcher-less documents are unaffected.
