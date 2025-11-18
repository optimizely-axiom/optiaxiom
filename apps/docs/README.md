# Docs

Contains the public documentation site built using Next.js and Nextra.

## Components

### Demo

Place demos in the `demos/` folder and use with the `Demo` component to showcase component usages.

```mdx
{/* app/(docs)/components/switch/page.mdx */}
import { Demo } from "@/components";

<Demo component="switch/usage" />

<Demo component="switch/size-usage" />
```

Export an `App` component from your demo usage. The file must be named `App.tsx` and must export a function named `App` to support StackBlitz sandbox integration:

```tsx
// demos/switch/usage/App.tsx
import { Switch } from "@optiaxiom/react";

export function App() {
  return <Switch>Label</Switch>;
}
```

#### Client Components

Only add the `"use client"` directive when your demo uses:

- React hooks (useState, useEffect, etc.)
- Browser APIs
- Event handlers with state

Static demos should omit this directive.

```tsx
// demos/switch/controlled-usage/App.tsx
"use client";

import { Switch } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch checked={checked} onCheckedChange={setChecked}>
      Label
    </Switch>
  );
}
```

#### Dynamic Controls

Optionally specify props on the `App` component to expose dynamic demo controls:

```tsx
// demos/switch/size-usage/App.tsx
import type { ComponentPropsWithRef } from "react";

import { Switch } from "@optiaxiom/react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Switch>, "size">) {
  return <Switch size={size}>Label</Switch>;
}
```

#### Demo Guidelines

**Naming Conventions:**

- Use descriptive folder names ending with `-usage` (e.g., `size-usage`, `controlled-usage`)
- The basic demo should be in the `usage/` folder
- Use kebab-case for all folder names

**Imports:**

- Always import components from `@optiaxiom/react`
- Icons should use `@tabler/icons-react`
- Import React types from `react` (e.g., `ComponentPropsWithRef`, `useState`)

**Demo Complexity:**

- Keep demos focused on demonstrating one feature
- Demos must be self-contained in a single `App.tsx` file to support StackBlitz integration
- Use multiple separate demos to show different aspects rather than one complex demo
- Prefer simple, understandable examples

### Props

Add prop tables for components using the `PropsTable` component.

```mdx
import { PropsTable } from "@/components";

<PropsTable component="Button" />
```

## Contributing

### Development

Run the following to only start docs:

```sh
pnpm -F docs... --parallel dev
```

This will spin up Next.js instance on port `5055`.

### Building

Run the following to build docs:

```sh
pnpm -F docs... build
```
