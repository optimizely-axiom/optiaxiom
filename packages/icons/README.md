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

> [!IMPORTANT]
> Commit `tags.json` exactly as the build generates it (then formatted by `pnpm lint`). Never edit it by hand — not even to keep existing icons' tags when Google's metadata returns different ones. The file mirrors Google's current metadata plus any custom tags from `icons.json`.

### Adding custom icons

Only for designs Material Symbols has no equivalent for.

1. Convert the Figma export to a single `<path>` in Material's `viewBox="0 -960 960 960"` (the 24px grid scaled by 40 and shifted up by 960), so it renders like every other icon.
2. Save it as `custom/<name>.svg`, plus `custom/<name>-fill.svg` if the icon has a filled state. Without one, the icon looks the same when `filled`.
3. Add an `icons.json` entry with custom tags (see below). Custom icons get no tags from Google, so these are their only search terms.
4. Build, add a changeset, and commit as for any new icon, including the `custom/` files.

A custom SVG takes precedence over a Material Symbol of the same name.

### Adding custom tags

Google's metadata supplies each icon's search tags (used by the docs gallery and the MCP server). To add your own, write the entry as an object mapping each alias to its extra tags — e.g. `"settings_slow_motion": { "SettingsSlowMotion": ["dxp"] }`. Then run `npm run build` and commit the regenerated `tags.json`.

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
