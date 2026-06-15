---
"@optiaxiom/proteus": patch
---

Guard `ProteusQuestion` against a missing or non-array `questions` prop
to prevent "cannot read length of undefined" runtime errors.
