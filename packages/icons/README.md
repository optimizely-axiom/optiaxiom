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
2. Add the icon name to `icons.json` (use the snake_case name, e.g. `arrow_back`)
3. Run `npm run build` to fetch the SVGs and rebuild the package
4. Commit the updated `icons.json`, `src/index.ts`, and `svg/*.svg.d.ts`

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
