---
"@optiaxiom/react": patch
---

Removed the internal `addon` prop from the public `Button` type. It is set internally based on leading/trailing content and was never meant for consumers.
