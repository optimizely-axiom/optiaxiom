---
"@optiaxiom/react": patch
---

fix `Time` crash when `date` is `undefined`, `null`, or an unparseable string — these now render nothing instead of throwing
