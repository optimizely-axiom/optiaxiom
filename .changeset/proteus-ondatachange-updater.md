---
"@optiaxiom/proteus": minor
---

Change `onDataChange` to receive a functional updater `(prev) => next` (the
shape React's `setState` accepts) instead of the full next data object. This
lets rapid successive form mutations compose without losing writes.

Migration: hosts that pass a `useState` setter directly
(`onDataChange={setData}`) need no change. Hosts that wrap it
(`onDataChange={(data) => …}`) must accept an updater instead:
`onDataChange={(updater) => setData(prev => updater(prev))}`.
