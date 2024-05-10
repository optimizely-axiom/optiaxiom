# Philosophy and Guiding Principles

### Vision

Our goal is to create an accessible component library that is extremely easy to pick up and use.

### Principles at a glance

1. Efficient
2. Accessible
3. Desirable (to both designers and developers)

## Principles

### Efficient

An efficient component should:

1. Have well defined responsibilities
2. Have clear and concise API
3. Have comprehensive documentation
4. Have good performance in terms of rendering speed

A collection of components should similarly:

1. Have well defined boundaries; so that component responsibilities do not overlap
2. Have consistent API across components; so they are intuitive

### Accessible

[Radix Primitives](https://www.radix-ui.com/primitives) is used to build accessible components.

### Desirable

TODO

## Development Guidelines

We should maintain the following guidelines when developing components:

#### Always provide sensible defaults

Components should just work out of the box as much as possible. Instead of requiring users to provide multiple props to setup. Props should be used to allow modifying the default behavior.

#### Do not use too many props

Components should not be confusing to implement. Try to avoid having too many props for behavior on a single component.

It's tricky setting an exact number here but anything more than 5 and the behavior should likely be broken up into multiple composable components.

#### Do not make breaking changes

Components should not have breaking changes between versions. Try to avoid making breaking changes as much as possible.

Instead make sure there is a smooth transition path and in case breaking changes are necessary they should be well documented in changelogs and migration guides

#### Use consistent prop names

Components should always use consistent prop names. Make sure to look at existing components (and even other existing component libraries) when naming props. For example use `variant` to specify the basic variations of a component.

This will make components intuitive and easy to use.

#### Allow custom styling

Components should support `className` prop to allow styling from outside. Allow developers to easily control an element's layout and appearance via props but provide `className` as an escape hatch for various other use cases.

#### Verify visual changes with design team

Each PR has an associated storybook on chromatic which should be validated with design team before publishing.

#### Always provide stories

All components should be accompanied by stories. There should be at least one story called **Primary** which should showcase the very basic and default capabilities and usage.

Additional stories should be provided to showcase more advanced use cases of the component. Story names should be concise and each story should only demonstrate a single functionality.

## How to add new components

A component can be added to the component library whenever it is used across multiple different products.

After verification from the design team you should follow proper development guidelines to add the component to the component library.

## Technologies

### React

[React](https://react.dev/) is used to build the components in our component library.

### Storybook

[Storybook](https://storybook.js.org/) is used to prototype and develop components. It is only meant for development and testing and **should not** be used for documenting components.

### Chromatic

[Chromatic](https://www.chromatic.com/) is used for visual regression testing and publishing storybook.

### Nextra

[Nextra](https://nextra.site/docs/docs-theme/start) is used to document the component library.

### Vanilla Extract

[Vanilla Extract](https://vanilla-extract.style/) is used for our styling solution. This allows us to build a zero runtime CSS-in-JS styled system utilizing type safe style definitions and design tokens re-use.

Style utilities and tokens should follow [Tailwind CSS](https://tailwindcss.com/) as much as possible and should be extensively documented.

### Vitest

[Vitest](https://vitest.dev/) is used for unit tests.

### Rollup

[Rollup](https://rollupjs.org/) is used to bundle the component library.

### Changesets

[Changesets](https://github.com/changesets/changesets) is used to manage the release process and maintain changelogs.
