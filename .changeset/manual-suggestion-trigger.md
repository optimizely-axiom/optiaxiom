---
"@optiaxiom/globals": patch
"@optiaxiom/react": patch
---

Add `manualSuggestion` flag to `unstable_SurfaceProvider`. When set, `Input` and `Textarea` skip the keystroke-debounced `track({ changed })` and instead render an Opal trigger button that fires `track({ requested, value })` on click and shows a loading spinner while pending. The next value-suggestion that arrives is auto-accepted silently.
