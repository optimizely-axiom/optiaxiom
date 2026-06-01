---
"@optiaxiom/react": patch
---

Clarify the descriptions of the `flex`, `gridTemplateColumns`, `gridColumn`, `gridAutoRows`, and `transition` style props, where the accepted value does not obviously map to its CSS intent. For example, `flex="none"` now documents that it neither grows nor shrinks (the replacement for `flex-shrink: 0`), and `gridTemplateColumns` documents that the value is the number of equal columns. These flow to IDE hovers, generated docs, and the MCP.
