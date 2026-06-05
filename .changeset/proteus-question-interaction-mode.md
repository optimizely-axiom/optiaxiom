---
"@optiaxiom/proteus": patch
---

add an `interaction` prop to ProteusQuestion. When set, submit and cancel report a structured `{ questions, answers }` payload via the named interaction instead of a text message, so a calling tool can read the answers programmatically. On cancel the payload also flags that the user declined. When omitted, the existing `message` (text transcript) behaviour is used.
