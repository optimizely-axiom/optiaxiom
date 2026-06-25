---
"@optiaxiom/globals": patch
"@optiaxiom/react": patch
---

remove the unused root CommonJS shims (`@optiaxiom/globals/fonts.js` and `@optiaxiom/react/unstable.js`) — these subpaths resolve through the package `exports` map, which every supported bundler and Node version honors
