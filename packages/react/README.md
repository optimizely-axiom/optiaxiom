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
npm install -g @optiaxiom/mcp
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

## Contributing

See the [main repository](https://github.com/optimizely-axiom/optiaxiom) for contribution guidelines.

## License

Apache-2.0
