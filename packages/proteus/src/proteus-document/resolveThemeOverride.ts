import { theme } from "@optiaxiom/react";

/**
 * A partial of the Axiom `theme` token contract: any subset of any category
 * (`colors`, `spacing`, `borderRadius`, …), down to individual tokens. Every
 * leaf is a CSS value string that replaces that token for the document subtree.
 *
 * @example
 * // Re-skin just the surface + text colors:
 * { colors: { "bg.default": "#1a1a2e", "fg.default": "#e0e0ff" } }
 */
export type ThemeOverride = DeepPartial<typeof theme>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

/**
 * Turn a partial `theme` override into a flat inline-style object of resolved
 * CSS custom properties — e.g. `{ colors: { "bg.default": "red" } }` becomes
 * `{ "--ax-colors-bg-default": "red" }`.
 *
 * Only the tokens present in `override` produce a variable (a true partial
 * contract): setting `bg.default` assigns that one var and leaves every other
 * token inheriting the ambient theme. We resolve each leaf against the matching
 * `theme` contract leaf — whose value is the token's `var(--ax-…)` reference —
 * and strip it to the bare property name so the value applies where the
 * variable is *defined*, not re-wrapped in another `var()`. Unknown keys (not
 * in the contract) are skipped rather than emitting a dangling variable.
 *
 * Returns `undefined` for a nullish or empty override so callers can avoid
 * rendering a wrapper element when there is nothing to scope.
 */
export function resolveThemeOverride(
  override: ThemeOverride | undefined,
): Record<string, string> | undefined {
  if (!override) {
    return undefined;
  }

  const vars: Record<string, string> = {};
  collect(override, theme as Record<string, unknown>, vars);

  return Object.keys(vars).length > 0 ? vars : undefined;
}

function collect(
  override: Record<string, unknown>,
  contract: Record<string, unknown>,
  out: Record<string, string>,
): void {
  for (const [key, value] of Object.entries(override)) {
    const contractLeaf = contract[key];
    if (contractLeaf === undefined || value == null) {
      continue;
    }

    if (typeof value === "string" && typeof contractLeaf === "string") {
      const name = varName(contractLeaf);
      if (name) {
        out[name] = value;
      }
    } else if (
      typeof value === "object" &&
      typeof contractLeaf === "object" &&
      contractLeaf !== null
    ) {
      collect(
        value as Record<string, unknown>,
        contractLeaf as Record<string, unknown>,
        out,
      );
    }
  }
}

/** `var(--ax-colors-bg-default)` → `--ax-colors-bg-default`. */
function varName(contractLeaf: string): string | undefined {
  const match = /^var\((--[^,)]+)/.exec(contractLeaf);
  return match?.[1];
}
