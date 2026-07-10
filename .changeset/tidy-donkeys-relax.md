---
"@optiaxiom/react": patch
---

narrowed the `formatRange` prop type on `DateRangePickerTrigger` from `Intl.DateTimeFormat["formatRange"]` to `(startDate: Date, endDate: Date) => string`. The component only ever calls the formatter with two `Date` values, so the previous type exposed an unnecessarily wide surface (`number | bigint | Date | Temporal` inputs) that the component never uses.
