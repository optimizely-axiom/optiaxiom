# Axiom

Axiom is the technical implementation of the Optimizely Design System.

## Getting Started

```sh
npm install @optiaxiom/react
```

```tsx
import { Text } from "@optiaxiom/react";

function App() {
  return <Text>Hello World!</Text>;
}
```

Please read the full [documentation](https://optimizely-axiom.github.io/optiaxiom/) for guides, examples, and API.

| Package name                                                                                                   | Description      |
| -------------------------------------------------------------------------------------------------------------- | ---------------- |
| [`@optiaxiom/react`](https://github.com/optimizely-axiom/optiaxiom/tree/main/packages/react)                   | React components |
| [`@optiaxiom/web-components`](https://github.com/optimizely-axiom/optiaxiom/tree/main/packages/web-components) | Web components   |

## Contributing

Clone the project and run:

```sh
pnpm install
```

Run the following to start your dev environment:

```sh
pnpm dev
```

This will spin up all the apps and packages in `dev` mode. Use [pnpm filtering](https://pnpm.io/filtering) to run individual apps:

```sh
# run docs only (along with all dependencies)
pnpm -F docs... --parallel dev

# run storybook only (along with all dependencies)
pnpm -F storybook... --parallel dev
```

### Testing

Run `lint` and `test` to run the linter and unit tests respectively:

```sh
pnpm lint

# run tests (in watch mode)
pnpm test
# run tests (once and exit)
pnpm test run
```

### Building

Run `build` to build the whole project or individual packages:

```sh
pnpm build

# build react only
pnpm -F react build
```
