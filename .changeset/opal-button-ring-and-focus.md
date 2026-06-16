---
"@optiaxiom/react": patch
---

Refine the opal `Button` variants. The `outline-opal` ring is now an animated
holographic texture rendered on a pseudo-element so it can grow outward on hover
without layout shift, and small non-icon opal buttons use a full (pill) radius.
Separately, loading buttons now keep the standard offset focus ring instead of
falling back to the browser default.
