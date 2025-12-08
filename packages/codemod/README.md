# @optiaxiom/codemod

Codemods for migrating Axiom Design System code.

## Installation

You don't need to install this package. Use `npx` to run it directly:

```bash
npx @optiaxiom/codemod <transform> <path>
```

## Available Transforms

### `flex-to-group`

Migrates from the deprecated `Flex` component to the new `Group` component.

**What it does:**

- Transforms `<Flex>` → `<Group flexDirection="column" gap="16">`
- Transforms `<Flex flexDirection="row">` → `<Group gap="16">`
- Transforms `<Flex flexDirection="column">` → `<Group flexDirection="column" gap="16">`
- Updates imports: `import { Flex }` → `import { Flex, Group }`
- Preserves all other props

**Usage:**

```bash
# Transform entire src directory
npx @optiaxiom/codemod flex-to-group src/

# Transform specific file
npx @optiaxiom/codemod flex-to-group src/components/MyComponent.tsx

# Dry run (preview changes without modifying files)
npx @optiaxiom/codemod flex-to-group src/ --dry
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
import { Flex, Group } from "@optiaxiom/react";

function MyComponent() {
  return (
    <Group flexDirection="column" gap="16">
      <div>1</div>
      <div>2</div>
    </Group>
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
<Group gap="8">
  <Button>Cancel</Button>
  <Button>Save</Button>
</Group>
```

**Important: Manual verification required**

The codemod adds `flexDirection` and `gap` props at the **beginning** of the props list. This means they will be overridden if a spread comes after them. However, this may not always be the desired behavior.

```tsx
// Codemod output (props before spread - CAN be overridden by spread)
<Group flexDirection="column" gap="16" {...props}>

// If you DON'T want props to be overridable, move them after the spread manually
<Group {...props} flexDirection="column" gap="16">
```

After running the codemod, review components that accept `{...props}` spreads to ensure the prop order matches your intent:

- **Props before spread**: Can be overridden by the spread (default codemod behavior)
- **Props after spread**: Cannot be overridden, will always take precedence

## Options

- `--dry` - Dry run (preview changes without modifying files)
- `--help`, `-h` - Show help message

## Why Group?

The `Flex` component has non-standard defaults that cause confusion:

- Defaults to `flexDirection="column"` (NOT `"row"` like CSS)
- Defaults to `gap="16"` (automatic spacing)

The `Group` component uses CSS-standard defaults:

- Defaults to `flexDirection="row"` (horizontal layout, like CSS)
- No default gap (you must specify it explicitly)

See the [migration guide](https://optimizely-axiom.github.io/optiaxiom/guides/group-migration/) for more details.

## License

Apache-2.0
