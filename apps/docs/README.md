# Docs

Contains the public documentation site built using Next.js and Nextra.

## Components

### Demo

Place demos in the `demos/` folder and use with the `Demo` component to showcase component usages.

```mdx
import { Demo } from "@/components/demo";
import { SizeUsage, Usage } from "@/demos/switch";

<Demo component={Usage} />

<Demo component={SizeUsage} />
```

Export an `App` component from your demo usage:

```tsx
import { Switch } from "@optiaxiom/react";

export function App() {
  return <Switch>Label</Switch>;
}
```

Optionally specify props on the `App` component to expose dynamic demo controls:

```tsx
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
import { PropsTable } from "@/components/props-table";
import { Button } from "@optiaxiom/react";

<PropsTable component={Button} />
```

By default we link to the `Box` component for additional props from the table - but this can be controlled using the `base` prop:

```mdx
import { Heading, Text } from "@optiaxiom/react";

<PropsTable base={Text} component={Heading} />
```

We can completely remove it by setting it to `false`:

```mdx
import { DropdownMenu } from "@optiaxiom/react";

<PropsTable base={false} component={DropdownMenu} />
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
