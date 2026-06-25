---
"@optiaxiom/react": patch
"@optiaxiom/web-components": patch
---

Fixed large primary `Button` reserving extra left padding when it has no leading icon. The tightened left padding now only applies when an icon or addon precedes the label.
