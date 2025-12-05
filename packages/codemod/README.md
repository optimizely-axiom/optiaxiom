# @optiaxiom/codemod

Codemods for migrating Axiom Design System code.

## Installation

You don't need to install this package. Use `npx` to run it directly:

```bash
npx @optiaxiom/codemod <transform> <path>
```

## Available Transforms

### `flex-to-stack`

Migrates from the deprecated `Flex` component to the new `Stack` component.

**What it does:**

- Transforms `<Flex>` → `<Stack flexDirection="column" gap="16">`
- Transforms `<Flex flexDirection="row">` → `<Stack gap="16">`
- Transforms `<Flex flexDirection="column">` → `<Stack flexDirection="column" gap="16">`
- Updates imports: `import { Flex }` → `import { Flex, Stack }`
- Preserves all other props

**Usage:**

```bash
# Transform entire src directory
npx @optiaxiom/codemod flex-to-stack src/

# Transform specific file
npx @optiaxiom/codemod flex-to-stack src/components/MyComponent.tsx

# Dry run (preview changes without modifying files)
npx @optiaxiom/codemod flex-to-stack src/ --dry
```

**Example transformations:**

Before:

```tsx
import { Flex } from "@optiaxiom/react";

function MyComponent() {
  return (
    <Flex>
      <div>1</div>
      <div>2</div>
    </Flex>
  );
}
```

After:

```tsx
import { Flex, Stack } from "@optiaxiom/react";

function MyComponent() {
  return (
    <Stack flexDirection="column" gap="16">
      <div>1</div>
      <div>2</div>
    </Stack>
  );
}
```

Before:

```tsx
<Flex flexDirection="row" gap="8">
  <Button>Cancel</Button>
  <Button>Save</Button>
</Flex>
```

After:

```tsx
<Stack gap="8">
  <Button>Cancel</Button>
  <Button>Save</Button>
</Stack>
```

## Options

- `--dry` - Dry run (preview changes without modifying files)
- `--help`, `-h` - Show help message

## Why Stack?

The `Flex` component has non-standard defaults that cause confusion:

- Defaults to `flexDirection="column"` (NOT `"row"` like CSS)
- Defaults to `gap="16"` (automatic spacing)

The `Stack` component uses CSS-standard defaults:

- Defaults to `flexDirection="row"` (horizontal layout, like CSS)
- No default gap (you must specify it explicitly)

See the [migration guide](https://optimizely-axiom.github.io/optiaxiom/guides/stack-migration/) for more details.

## License

Apache-2.0
