import { getDocs } from "@optiaxiom/shared";
import { describe, expect, it } from "vitest";

import { parsePropDefinition } from "./parsers.mjs";

const docs = getDocs();

/**
 * @param {string} displayName
 * @param {string} propName
 */
function getProp(displayName, propName) {
  const component = docs.find((d) => d.displayName === displayName);
  if (!component) throw new Error(`Component not found: ${displayName}`);
  const prop = component.props.find((p) => p.name === propName);
  if (!prop) throw new Error(`Prop not found: ${propName}`);
  return prop;
}

describe("parsePropDefinition", () => {
  it("should extract enum values from simple union types", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Button", "size"),
    );

    expect(result.type).toBe("enum");
    expect(result.values).toContain("sm");
    expect(result.values).toContain("md");
    expect(result.values).toContain("lg");
  });

  it("should skip enum extraction for expanded array types", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Select", "options"),
    );

    expect(result.type).toContain("label: string");
    expect(result.type).toContain("value: string");
    expect(result.type).not.toBe("enum");
    expect(result.values).toBeUndefined();
    expect(result.required).toBe(true);
  });

  it("should skip enum extraction for Menu options array type", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Menu", "options"),
    );

    expect(result.type).toContain("label:");
    expect(result.type).toContain("execute?:");
    expect(result.type).not.toBe("enum");
    expect(result.values).toBeUndefined();
    expect(result.required).toBe(true);
  });

  it("should still extract enum values from mixed union types", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Menu", "loading"),
    );

    expect(result.type).toBe("enum");
    expect(result.values).toContain(false);
    expect(result.values).toContain(true);
    expect(result.values).toContain("spinner");
    expect(result.values).toContain("skeleton");
  });

  it("should use raw type for simple types without enum values", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Button", "disabled"),
    );

    expect(result.type).toBe("boolean");
    expect(result.values).toBeUndefined();
  });

  it("should include default value when present", () => {
    const result = parsePropDefinition(
      getProp("@optiaxiom/react/Alert", "intent"),
    );

    expect(result.type).toBe("enum");
    expect(result.default).toBe("neutral");
  });

  it("should handle ConditionalStyleWithResponsiveArray types", () => {
    const result = parsePropDefinition(getProp("@optiaxiom/react/Box", "p"));

    expect(result.type).toBe("enum");
    expect(result.values).toBeDefined();
    expect(result.values?.length).toBeGreaterThan(0);
  });
});
