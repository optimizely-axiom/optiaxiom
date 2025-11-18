# Contributing to Axiom

Thank you for your interest in contributing to Axiom! This guide will help you get started.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Install the version specified in [.node-version](.node-version)
  - We recommend using a version manager like [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm)
  - With fnm: `fnm install` (automatically reads .node-version)
- **pnpm**: Install the version specified in [package.json](package.json)
  - We recommend using [corepack](https://nodejs.org/api/corepack.html) (comes with Node.js)
  - Enable corepack: `corepack enable`
  - Corepack will automatically use the correct pnpm version

## Getting Started

1. **Fork and Clone**

   ```sh
   git clone https://github.com/your-username/optiaxiom.git
   cd optiaxiom
   ```

2. **Install Dependencies**

   ```sh
   pnpm install
   ```

3. **Start Development Environment**

   ```sh
   # Start all apps and packages
   pnpm dev

   # Or start specific apps
   pnpm dev:docs      # Documentation site only
   pnpm dev:storybook # Storybook only
   ```

## Development Workflow

### Making Changes

1. **Create a Branch**

   ```sh
   git checkout -b your-feature-name
   ```

2. **Make Your Changes**
   - Follow our [Philosophy](PHILOSOPHY.md) for component design principles
   - Write tests for new features
   - Update documentation as needed

3. **Run Tests and Linting**

   ```sh
   pnpm lint           # Run linter
   pnpm test           # Run tests in watch mode
   pnpm test run       # Run tests once
   ```

4. **Build the Project**

   ```sh
   pnpm build          # Build all packages
   pnpm -F react build # Build specific package
   ```

### Creating a Pull Request

1. **Add a Changeset**

   If your changes affect the public API or fix bugs, add a changeset:

   ```sh
   pnpm changeset
   ```

   - Select the packages affected by your changes
   - Choose the appropriate version bump (major, minor, patch)
   - Write a clear description of the changes

2. **Commit Your Changes**

   ```sh
   git add .
   git commit -m "feat: your descriptive commit message"
   ```

   We follow conventional commit format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

3. **Push to Your Fork**

   ```sh
   git push origin your-feature-name
   ```

4. **Open a Pull Request**
   - Go to the [repository on GitHub](https://github.com/optimizely-axiom/optiaxiom)
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template with:
     - Clear description of changes
     - Reference any related issues
     - Screenshots for UI changes
     - Test plan

### Pull Request Guidelines

- **Keep PRs focused**: One feature/fix per PR
- **Update documentation**: Include relevant docs updates
- **Add tests**: Ensure new code is tested
- **Pass CI checks**: All workflows must pass
- **Visual changes**: Chromatic will run visual regression tests
- **Get approval**: At least one maintainer approval required

## Adding New Components

Components should only be added when they are used across **three** different products. See [PHILOSOPHY.md](PHILOSOPHY.md#adding-new-components) for component standards and design principles.

### Implementation Checklist

When adding a new component, ensure you:

- [ ] Place implementation in `packages/react/src/`
- [ ] Include unit tests in the component file
- [ ] Create Storybook stories in `apps/storybook/src/`
- [ ] Add documentation page in `apps/docs/app/(docs)/components/`
- [ ] Provide demo examples in `apps/docs/demos/`
- [ ] Include Figma design link in story metadata
- [ ] Get design team approval via Chromatic
- [ ] Add a changeset with `pnpm changeset`

## Writing Stories

All components must have Storybook stories. See [apps/storybook/README.md](apps/storybook/README.md) for detailed guidelines.

Required stories:

- **Basic** - Simplest use case
- **Variants** - Different props (size, appearance, etc.)
- **States** - Disabled, loading, error states
- **Advanced** - Complex examples

## Writing Documentation

Component documentation should be added to `apps/docs/`. See [apps/docs/README.md](apps/docs/README.md) for guidelines.

Required documentation:

- Overview and when to use
- Basic usage demo
- Props table
- Common use cases with demos
- Accessibility notes

## Code Style

- **Linting**: We use ESLint - run `pnpm lint` before committing
- **Formatting**: We use Prettier - configured to run automatically
- **TypeScript**: All code must be properly typed
- **Design Principles**: Follow our [Philosophy](PHILOSOPHY.md) for component architecture, type safety, and naming conventions

## Testing

- **Unit tests**: Use Vitest and React Testing Library
- **Visual tests**: Storybook + Chromatic for visual regression
- **Interaction tests**: Add `play` functions in stories for complex interactions
- **Accessibility**: Verify ARIA attributes and keyboard navigation

## Release Process

Releases are automated using [Changesets](https://github.com/changesets/changesets):

1. Maintainers merge PRs with changesets
2. GitHub Actions creates a "Version Packages" PR
3. When merged, packages are automatically published to npm

## Getting Help

- **Questions?** Open a [discussion](https://github.com/optimizely-axiom/optiaxiom/discussions)
- **Bug reports**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature requests**: Open an issue with your proposal
- **Documentation**: Check our [full documentation](https://optimizely-axiom.github.io/optiaxiom/)

## Code of Conduct

Please be respectful and constructive in all interactions. We're building a welcoming community for everyone.

## License

By contributing to Axiom, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
