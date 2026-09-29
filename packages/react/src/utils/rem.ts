/**
 * `--ax-styles-scale` defaults to `1rem` in ThemeProvider. Consumers can set it
 * (e.g. `16px`) on the same `:root` or `:host` as the theme to decouple sizing
 * from the page's root font size. Media queries can't read custom properties,
 * so breakpoints must use plain `rem` instead.
 */
export const rem = <T extends string>(value: T) => {
  const units = value.endsWith("px")
    ? parseFloat(value) / 16
    : value.endsWith("rem")
      ? parseFloat(value)
      : null;
  return (
    units === null
      ? value
      : `calc(${parseFloat(units.toFixed(4))} * var(--ax-styles-scale))`
  ) as T;
};
