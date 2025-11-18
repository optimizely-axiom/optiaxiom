# Philosophy

Our goal is to create an accessible component library that is extremely easy to pick up and use.

We follow the [components.build specification](https://www.components.build) for modern component library best practices, including composition, accessibility, type safety, and styling patterns.

## Core Principles

### 1. Sensible Defaults

Components work out of the box without configuration. Props modify behavior, not enable it.

### 2. Composition Over Configuration

- Limit props to ~5 per component—break into smaller composable pieces beyond that
- Follow [components.build patterns](https://www.components.build/composition): `DialogRoot`, `DialogTrigger`, `DialogContent`
- Support [`asChild`](https://www.components.build/as-child) for polymorphic rendering
- Support [controlled and uncontrolled state](https://www.components.build/state) where applicable
- One component wraps one element for maximum customization

### 3. Accessibility First

- Meet **WCAG 2.1 AA standards** minimum
- Use semantic HTML, proper ARIA, keyboard navigation
- See [components.build/accessibility](https://www.components.build/accessibility) for patterns
- Verify Radix Primitives features are properly exposed

### 4. Type Safety

- Extend `BoxProps` for the underlying element
- Export all prop types as `<ComponentName>Props`
- Spread props: `{...props}`
- Document with JSDoc
- See [components.build/types](https://www.components.build/types)

### 5. Customizable Styling

- Support `className` for external styling
- Use Vanilla Extract recipes for type-safe variants
- Allow layout/appearance control via props

### 6. Stability

- Avoid breaking changes
- Provide migration guides when necessary
- Document changes in changelogs

### 7. Consistency

- Use consistent prop names across components (e.g., `intent` for color variations)
- Use consistent sub-component naming (e.g., `Header/Body/Footer`)
- Follow patterns from existing components

### 8. Design Validation

- Verify all visual changes with design team via Chromatic
- Provide Storybook stories for all components:
  - **Basic** story showing default usage (required)
  - Additional stories for variants and advanced use cases

## Adding New Components

Components are added when used across **three** different products, with design team verification.

<details>
<summary><strong>Component Checklist</strong></summary>

- [ ] Used in 3+ products
- [ ] Design team approval
- [ ] Component implementation
- [ ] Unit tests
- [ ] Storybook stories (Basic + variants)
- [ ] Documentation page
- [ ] Accessibility verified
- [ ] Chromatic review passed
- [ ] Changeset added

</details>

---

**Technology stack details are maintained in [README.md](./README.md#architecture)**
