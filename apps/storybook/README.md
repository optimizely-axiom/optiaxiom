# Storybook

Contains stories for all react components to enable visual regression testing and interaction testing.

## Parameters

### `useAxiomProvider`

Default: `true`

When true a decorator containing the AxiomProvider will be added to the story.

### `useOverlayDecorator`

Default: `false`

Enable this when testing overlay components that display content in a portal outside the storybook canvas. Adds a decorator spanning the whole screen with minimum 512px dimensions so Chromatic can capture the overlay in snapshots.

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
