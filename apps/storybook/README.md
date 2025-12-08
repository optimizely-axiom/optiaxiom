# Storybook

Contains stories for all react components to enable visual regression testing and interaction testing.

## Writing Stories

### Basic Structure

All stories follow a consistent pattern using TypeScript and Storybook's CSF (Component Story Format):

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent } from "@optiaxiom/react";

export default {
  component: MyComponent,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/...",
    },
  },
} as Meta<typeof MyComponent>;

type Story = StoryObj<typeof MyComponent>;

export const Basic: Story = {
  args: {
    children: "Content",
  },
};
```

### Story Naming Conventions

Stories should follow this general order:

1. **Basic** - The simplest, most common use case
2. **Variants** - Different appearances, sizes, or states (e.g., `Appearance`, `Sizes`)
3. **States** - Disabled, loading, error states
4. **Advanced** - Complex examples (e.g., `Controlled`, `WithLabel`)
5. **Edge cases** - Special scenarios (e.g., `Truncate`, `MinMaxDates`)

### Using Args vs Render Functions

**Simple stories** - Use `args` directly:

```tsx
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};
```

**Multiple variants** - Use a `render` function to show variations:

```tsx
export const Sizes: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} />
      <Input {...args} size="lg" />
    </Group>
  ),
};
```

### Story Composition

You can extend existing stories using spread syntax:

```tsx
export const Appearance: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Button {...args} />
      <Button {...args} appearance="primary" />
    </Group>
  ),
};

export const Disabled: Story = {
  ...Appearance, // Inherit render function
  args: {
    children: "Button",
    disabled: true,
  },
};
```

### Handling Icons in Controls

For components that accept icon props, use the mapping pattern to enable Storybook controls:

```tsx
export default {
  argTypes: {
    icon: {
      control: { type: "select" },
      mapping: {
        "chevron-down": <IconChevronDown />,
        "cloud-upload": <IconCloudUpload />,
      },
      options: ["chevron-down", "cloud-upload"],
    },
  },
  component: Button,
} as Meta<typeof Button>;
```

This allows users to select icons from a dropdown in the controls panel.

### Controlled Components

For controlled components, use a wrapper function with state:

```tsx
export const Controlled: Story = {
  render: function Sample(args) {
    const [value, setValue] = useState("");

    return (
      <Group flexDirection="column" gap="16">
        <DateInput
          {...args}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        <Text fontSize="md">Current value: {value}</Text>
        <Button onClick={() => setValue("")}>Clear</Button>
      </Group>
    );
  },
};
```

### Interaction Testing

Use the `play` function to add interaction tests:

```tsx
export const WithLabel: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
  },
};
```

Key points:

- Import test utilities from `storybook/test`
- Use `canvas` to scope queries to the story
- Use `screen` for queries outside the story (e.g., portals, popovers)
- Use `await` and `waitFor` for async interactions

### Using Decorators

**Field wrapper** - For form inputs that need labels:

```tsx
export const WithLabel: Story = {
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
};
```

**Custom decorators** - Apply custom wrappers to individual stories.

## Parameters

### Figma Integration

Add Figma design links to story metadata:

```tsx
export default {
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/...",
    },
  },
} as Meta<typeof Button>;
```

This displays a "Design" tab in Storybook for easy design reference.

### `useAxiomProvider`

Default: `true`

When true, a decorator containing the AxiomProvider will be added to the story. This is configured globally in `.storybook/preview.tsx`.

Set to `false` for stories that need to test behavior without the provider:

```tsx
export const WithoutProvider: Story = {
  parameters: {
    useAxiomProvider: false,
  },
};
```

## Best Practices

1. **Always start with a Basic story** - Show the simplest use case first
2. **Cover all prop variations** - Size, appearance, state combinations
3. **Test interactions** - Add play functions for interactive components
4. **Show real-world examples** - Include practical use cases
5. **Use accessibility labels** - Always provide `aria-label` or visible labels
6. **Keep stories focused** - Each story should demonstrate one concept
7. **Document edge cases** - Show how the component handles unusual inputs

## Contributing

### Development

Run the following to only start storybook:

```sh
pnpm -F storybook... --parallel dev
```

This will spin up a storybook instance on port `6006`.

### Building

Run the following to build storybook:

```sh
pnpm -F storybook... build
```

### Running Tests

To run interaction tests:

```sh
pnpm -F storybook test
```
