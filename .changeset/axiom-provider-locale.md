---
"@optiaxiom/react": patch
"@optiaxiom/web-components": patch
---

Added a `locale` prop to `AxiomProvider` (a BCP-47 language tag, e.g. `"fr-FR"`) to override the locale used by date/time components. Previously `Calendar`, `DateRangePicker`, `Clock`, and `Time` always localized to the browser locale with no way to configure it; now their captions, weekday headers, month/year grids, week start, range text, AM/PM labels, digit numbering system, and timezone label follow the provided locale. When omitted, behavior is unchanged and still follows the browser locale.
