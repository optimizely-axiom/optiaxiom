# Axiom

A React implementation of Optimizely's Axiom Design System.

## Installation

Install the package using your package manager of choice:

```sh
npm install @optiaxiom/react
```

## AI Assistant Integration

We provide an MCP server that enables AI assistants like Claude Code and Cursor to access accurate Axiom component metadata, design tokens, and usage examples:

```sh
claude mcp add --scope project axiom -- npx -y @optiaxiom/mcp@latest
```

See the [MCP guide](https://optimizely-axiom.github.io/optiaxiom/guides/mcp) for setup instructions.

## Getting Started

### 1. Setup CSS Imports

Configure your bundler to handle CSS imports. For most modern bundlers (Vite, Next.js, Create React App), this works out of the box. For custom setups, see our [CSS imports guide](https://optimizely-axiom.github.io/optiaxiom/guides/css-imports).

### 2. Add the Provider

Wrap your application with `AxiomProvider`:

```jsx
import { AxiomProvider } from "@optiaxiom/react";

export function App() {
  return <AxiomProvider>{/* Your app code here */}</AxiomProvider>;
}
```

### 3. Use Components

Import and use components in your application:

```jsx
import { Box, Button, Group, Input } from "@optiaxiom/react";

export function MyComponent() {
  return (
    <Group alignItems="start" flexDirection="column" gap="16">
      <Input placeholder="Enter text..." />
      <Button appearance="primary">Submit</Button>
    </Group>
  );
}
```

## Examples

### Basic Button

```jsx
import { Button } from "@optiaxiom/react";

<Button>Click me</Button>;
```

### Form with Validation

```jsx
import { Button, Field, Group, Input } from "@optiaxiom/react";

function LoginForm() {
  return (
    <Group alignItems="start" flexDirection="column" gap="16">
      <Field label="Email">
        <Input placeholder="you@example.com" type="email" />
      </Field>
      <Field label="Password">
        <Input type="password" />
      </Field>
      <Button appearance="primary">Sign In</Button>
    </Group>
  );
}
```

### Layout with Box and Group

```jsx
import { Box, Group, Heading, Text } from "@optiaxiom/react";

function Sample() {
  return (
    <Box bg="bg.default" color="fg.default" p="16" rounded="md" shadow="sm">
      <Group flexDirection="column" gap="16">
        <Heading level="3">Sample Title</Heading>
        <Text>Sample description goes here</Text>
      </Group>
    </Box>
  );
}
```

## Documentation

For comprehensive guides, component API reference, and more examples:

- [Documentation](https://optimizely-axiom.github.io/optiaxiom/)
- [Component Library](https://optimizely-axiom.github.io/optiaxiom/components/button)
- [Styling Guide](https://optimizely-axiom.github.io/optiaxiom/guides/styling)
- [Icons Guide](https://optimizely-axiom.github.io/optiaxiom/guides/icons)

## Pinned dependencies

Every `@radix-ui/*` dependency is pinned to an exact version. Radix packages pin each other exactly, so ranges would let an install mix release waves and duplicate internals such as the dismissable layer stack, which only works within one copy. Move them together, and only past these holds:

| Package                   | Held at  | Why                                                                                                                                                                                                                                       | Lift when                                                                                      |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `@radix-ui/react-toast`   | `1.2.24` | 1.3.x renders no toasts on React 16/17: its `startTransition` fallback drops the updates ([radix-ui/primitives#4228](https://github.com/radix-ui/primitives/issues/4228)). The rest of the Radix packages stay on Toast 1.2.24's release. | The fix ([#4231](https://github.com/radix-ui/primitives/pull/4231)) ships.                     |
| `@radix-ui/react-tabs`    | `1.1.21` | 1.1.22 calls `onValueChange` twice per click ([radix-ui/primitives#4266](https://github.com/radix-ui/primitives/issues/4266)).                                                                                                            | A release fixes the double call.                                                               |
| `@radix-ui/react-context` | `1.1.4`  | 1.2.0 and later type its hooks with interfaces it doesn't export, so our exported context hooks fail declaration emit (TS4023, [radix-ui/primitives#4098](https://github.com/radix-ui/primitives/issues/4098)).                           | The fix ([#4204](https://github.com/radix-ui/primitives/pull/4204)) ships in a stable release. |

Every `@dnd-kit/*` package is a devDependency pinned to one exact version and bundled into our dist, so consumers install none of them. `@dnd-kit/react` calls React 18 APIs and is patched (`patches/@dnd-kit__react.patch`) to fall back on React 16/17. The packages require each other at matching versions, so move them together and check the patch still applies after each bump. `@preact/signals-core`, which `@dnd-kit/state` depends on, is listed as a ranged devDependency, not imported anywhere: listing it is how the dependency update workflow keeps the bundled copy current.

CI runs the specs on React 17 as well as 18, so a bump that breaks React 17 fails there.

## Contributing

See the [main repository](https://github.com/optimizely-axiom/optiaxiom) for contribution guidelines.

## License

Apache-2.0
