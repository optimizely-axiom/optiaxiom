---
"@optiaxiom/proteus": minor
---

Add an `else` branch to `Show`. When the condition is false, `Show` now renders `else` instead of nothing — for element children and, since `Show` also resolves as a value, for props. Chain nested `Show`/`else` to express multi-way choices in a single expression (e.g. a `Badge` whose `intent` maps a value to one of several tokens), instead of repeating the element once per case. `Show` without an `else` is unchanged.
