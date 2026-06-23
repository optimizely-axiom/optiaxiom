# Axiom Icons Library

Material Symbols kit for use with the Optimizely Design System.

## Getting Started

```sh
npm install @optiaxiom/icons
```

```tsx
import { IconDelete } from "@optiaxiom/icons";

function App() {
  return (
    <>
      <IconDelete />
      <IconDelete size="md" />
      <IconDelete filled />
    </>
  );
}
```

Check out our [Icons Guide](https://optimizely-axiom.github.io/optiaxiom/guides/icons) to learn more and explore all available icons.

## Contributing

### Adding new icons

1. Find the icon name on [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols)
2. Add an entry to `icons.json` mapping the Material Symbols snake_case name to its component alias. For new icons, the alias must be the exact Material Symbols name in PascalCase — e.g. `"assured_workload": ["AssuredWorkload"]`. The component is then exported as that alias prefixed with `Icon` (e.g. `IconAssuredWorkload`).
3. Run `npm run build` to fetch the SVGs and rebuild the package
4. Add a changeset (run `pnpm changeset` from the repo root) with a `minor` bump for `@optiaxiom/icons`
5. Commit the updated `icons.json`, `src/index.ts`, `tags.json`, `svg/*.svg.d.ts`, and the new `.changeset/*.md` file (the `svg/*.svg` files themselves are gitignored and re-fetched at build time)

> [!NOTE]
> Some existing icons use hand-picked aliases that differ from their Material Symbols name (e.g. `"account_circle": ["CircleUser"]`). These exist only to keep parity with our legacy icons package and should not be used as a pattern for new icons.

### How it works

Icons are fetched directly from Google Fonts as SVGs using the following parameters:

- **Style:** Rounded
- **Weight:** 300
- **Grade:** 200
- **Optical size:** 40px

The SVG files are committed to the `svg/` directory. The `icons.json` file is the source of truth for which icons are included. At build time, a Rollup plugin converts each SVG into a React component.

See the [main repository](https://github.com/optimizely-axiom/optiaxiom) for general contribution guidelines.

## License

Apache-2.0
