# Docs

Contains the public documentation site built using Next.js and Nextra.

## Components

### Demo

Place demos in the `demos/` folder and use with the `Demo` component to showcase component usages.

```mdx
{/* pages/components/switch.mdx */}
import { Demo } from "@/components/demo";
import { SizeUsage, Usage } from "@/demos/switch";

<Demo component={Usage} />

<Demo component={SizeUsage} />
```

Export an `App` component from your demo usage:

```tsx
// demons/switch/usage/App.tsx
import { Switch } from "@optiaxiom/react";

export function App() {
  return <Switch>Label</Switch>;
}
```

Optionally specify props on the `App` component to expose dynamic demo controls:

```tsx
// demons/switch/size-usage/App.tsx
import type { ComponentPropsWithRef } from "react";

import { Switch } from "@optiaxiom/react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Switch>, "size">) {
  return <Switch size={size}>Label</Switch>;
}
```

### Props

Add prop tables for components using the `PropsTable` component.

```mdx
import { components, PropsTable } from "@/components/props-table";

<PropsTable component={components["Button"]} />
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
