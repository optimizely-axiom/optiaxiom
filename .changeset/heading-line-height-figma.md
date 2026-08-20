---
"@optiaxiom/react": patch
"@optiaxiom/web-components": patch
"@optiaxiom/proteus": patch
---

`Heading` now sets font size and a tighter line height together per level to match the Figma type styles (1: 50px/1.04, 2: 28px/1.04, 3: 20px/1.1, 4: 16px/1.3). To render a level's size under a different tag, use `level` with `asChild` instead of overriding `fontSize`.
