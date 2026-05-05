---
"@optiaxiom/globals": patch
"@optiaxiom/react": patch
---

Add `manualSuggestion` flag to `unstable_SurfaceProvider`. When set, `Input` and `Textarea` skip the keystroke-debounced `track({ changed })` and instead render an Opal trigger button (pulses while pending) that fires `track({ changed, value })` on click. The next value-suggestion that arrives is auto-accepted silently. After accept the button hides until the value diverges again.
