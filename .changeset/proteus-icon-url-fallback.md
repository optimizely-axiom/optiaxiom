---
"@optiaxiom/proteus": patch
---

Fall back to `<img src={name}>` for `Icon` elements when `name` is an `http(s)://` or `data:` URL not present in the `icons` map. Previously such names rendered nothing (or threw in strict mode). Registered icons continue to take precedence; unknown non-URL names keep the current null / strict-throw behavior.
