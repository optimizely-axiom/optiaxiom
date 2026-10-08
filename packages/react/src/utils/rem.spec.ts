import { describe, expect, it } from "vitest";

import { rem } from "./rem";

describe("rem", () => {
  // jsdom doesn't resolve calc() or custom properties, so this pins the
  // emitted fallback that keeps sizes non-zero under a host ThemeProvider
  // from a release that predates `--ax-styles-scale`.
  it("should keep sizes when the host theme does not define the scale", () => {
    expect(rem("16px")).toBe("calc(1 * var(--ax-styles-scale, 1rem))");
    expect(rem("0.5rem")).toBe("calc(0.5 * var(--ax-styles-scale, 1rem))");
  });

  it("should pass through values without px or rem units", () => {
    expect(rem("auto")).toBe("auto");
  });
});
