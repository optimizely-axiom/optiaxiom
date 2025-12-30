# Axiom

A React implementation of Optimizely's Axiom Design System.

## For Users

### Installation

```sh
npm install @optiaxiom/react
```

- [Documentation](https://optimizely-axiom.github.io/optiaxiom/)
- [Philosophy](./PHILOSOPHY.md)

### AI Assistant Integration

We provide an [MCP server](./packages/mcp) that enables AI assistants like Claude Code and Cursor to access accurate Axiom component metadata, design tokens, and usage examples. This helps AI assistants generate better code using the Axiom design system.

```sh
npm install -g @optiaxiom/mcp
```

See the [MCP guide](https://optimizely-axiom.github.io/optiaxiom/guides/mcp) for setup instructions.

## For Contributors

### Prerequisites

- **Node.js**: Version specified in [.node-version](.node-version)
  - Install with [fnm](https://github.com/Schniz/fnm): `fnm install`
- **pnpm**: Version specified in [package.json](./package.json)
  - Install with [corepack](https://nodejs.org/api/corepack.html): `corepack enable`

### Project Structure

This is a monorepo containing multiple packages and applications:

```
optiaxiom/
├── packages/
│   ├── react/              # Main React component library (@optiaxiom/react)
│   ├── web-components/     # Framework-agnostic web components
│   ├── globals/            # Internal utilities and design tokens
│   └── shared/             # Shared build and development tools
├── apps/
│   ├── docs/               # Documentation site (Nextra + Next.js)
│   ├── storybook/          # Component development and visual testing
│   └── figma/              # Figma integration utilities
└── .changeset/             # Changesets for version management
```

#### Packages

- [`@optiaxiom/react`](./packages/react): React component library
- [`@optiaxiom/web-components`](./packages/web-components): Web component library
- [`@optiaxiom/globals`](./packages/globals): Design tokens and shared React contexts (for module federation)
- [`@optiaxiom/codemod`](./packages/codemod): Codemods for migrating Axiom code
- [`@optiaxiom/shared`](./packages/shared): Shared build tools (not for public use)

#### Apps

- [**docs**](./apps/docs): Public documentation site built with Nextra
- [**storybook**](./apps/storybook): Component development and visual regression testing
- [**figma**](./apps/figma): Figma Code Connect integration

### Architecture

#### Technology Stack

The project uses a modern, type-safe stack optimized for design system development:

**Core Libraries:**

- [React](https://react.dev/) - Component implementation
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vanilla Extract](https://vanilla-extract.style/) - Zero-runtime CSS-in-JS with type-safe design tokens

**Component Primitives:**

- [Radix UI](https://www.radix-ui.com/primitives) - Accessible component primitives
- [Downshift](https://www.downshift-js.com/) - Accessible comboboxes
- [TanStack Table](https://tanstack.com/table) - Flexible table components
- [React DayPicker](https://daypicker.dev/) - Date pickers and calendars

**Development & Testing:**

- [Vitest](https://vitest.dev/) - Unit testing
- [Testing Library](https://testing-library.com/) - Component testing
- [Storybook](https://storybook.js.org/) - Component development & documentation
- [Chromatic](https://www.chromatic.com/) - Visual regression testing

**Documentation & Tooling:**

- [Nextra](https://nextra.site/) - Documentation site
- [Rollup](https://rollupjs.org/) - Package bundling
- [Changesets](https://github.com/changesets/changesets) - Version management & changelog

#### Design Tokens

Design tokens are defined in [`@optiaxiom/globals`](./packages/globals) and provide a consistent design language:

- **Colors**: Semantic color system with light/dark mode support
- **Spacing**: Consistent spacing scale
- **Typography**: Font sizes, weights, and line heights
- **Shadows**: Elevation and depth
- **Radii**: Border radius values

Tokens are consumed via Vanilla Extract's type-safe API, ensuring consistency across components.

#### Component Development Flow

1. **Design** - Components start in Figma with design team approval
2. **Develop** - Built in Storybook with all variants and states
3. **Test** - Unit tests + interaction tests + visual regression
4. **Document** - API docs, usage examples, and demos
5. **Review** - Code review + design review via Chromatic
6. **Release** - Automated releases via Changesets

#### Build System

- **Bundling**: Rollup with ESM and CJS outputs
- **CSS**: Vanilla Extract generates static CSS at build time
- **Types**: Generated TypeScript declarations
- **Tree-shaking**: Components are individually importable for optimal bundle size

## Contributing

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

**Quick Start:**

Clone the project and run:

```sh
pnpm install
```

### Development

Run the following to start your dev environment:

```sh
pnpm dev
```

This will spin up all the apps and packages in `dev` mode. Use [pnpm filtering](https://pnpm.io/filtering) to run individual apps:

```sh
# run docs only (along with all dependencies)
pnpm dev:docs

# run storybook only (along with all dependencies)
pnpm dev:storybook
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

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.
