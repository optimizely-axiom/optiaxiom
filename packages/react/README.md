# Axiom

A React implementation of Optimizely's Axiom Design System.

## Installation

Install the package using your package manager of choice:

```sh
npm install @optiaxiom/react
```

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
import { Button, Input, Box, Flex } from "@optiaxiom/react";

export function MyComponent() {
  return (
    <Flex alignItems="start">
      <Input placeholder="Enter text..." />
      <Button appearance="primary">Submit</Button>
    </Flex>
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
import { Field, Input, Button, Flex } from "@optiaxiom/react";

function LoginForm() {
  return (
    <Flex alignItems="start">
      <Field label="Email">
        <Input placeholder="you@example.com" type="email" />
      </Field>
      <Field label="Password">
        <Input type="password" />
      </Field>
      <Button appearance="primary">Sign In</Button>
    </Flex>
  );
}
```

### Layout with Box and Flex

```jsx
import { Box, Flex, Heading, Text } from "@optiaxiom/react";

function Sample() {
  return (
    <Box bg="bg.default" color="fg.default" p="16" rounded="md" shadow="sm">
      <Flex>
        <Heading level="3">Sample Title</Heading>
        <Text>Sample description goes here</Text>
      </Flex>
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
